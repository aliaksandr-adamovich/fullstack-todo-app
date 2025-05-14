import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateTodoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;
    description?: string;
}
