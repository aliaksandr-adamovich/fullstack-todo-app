import {
    Body,
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Req,
    UseGuards,
} from '@nestjs/common';
import {Request} from 'express';
import {TodoService} from './todo.service';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {JwtAuthGuard} from '../auth/jwt.guard';
import {ApiBearerAuth, ApiOperation} from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {
    }

    @Get()
    @ApiOperation({summary: 'Get all users todos'})
    findAll(@Req() req: Request) {

        const user = req.user as any;
        return this.todoService.findAllForUser(user.userId);
    }

    @Post()
    @ApiOperation({summary: 'Create new todo'})

    create(@Body() dto: CreateTodoDto, @Req() req: Request) {
        const user = req.user as any;
        return this.todoService.create(dto, user.userId);
    }

    @Patch(':id/toggle')
    @ApiOperation({summary: 'Toggle users todo'})

    toggle(@Param('id') id: string, @Req() req: Request) {
        const user = req.user as any;
        return this.todoService.toggle(Number(id), user.userId);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update users todo'})

    update(@Param('id') id: string, @Body() dto: UpdateTodoDto, @Req() req: Request) {
        const user = req.user as any;
        return this.todoService.update(Number(id), dto, user.userId);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete users todo'})

    remove(@Param('id') id: string, @Req() req: Request) {
        const user = req.user as any;
        return this.todoService.delete(Number(id), user.userId);
    }
}
