import { Body, Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    findAll() {
        return this.todoService.findAll();
    }

    @Post()
    create(@Body() dto: CreateTodoDto) {
        return this.todoService.create(dto);
    }

    @Patch(':id/toggle')
    toggle(@Param('id') id: string) {
        return this.todoService.toggle(Number(id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
        return this.todoService.update(Number(id), dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todoService.delete(Number(id));
    }
}
