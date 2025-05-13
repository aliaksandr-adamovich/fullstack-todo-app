import {IsOptional, IsString, IsBoolean} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateTodoDto {
    @ApiProperty()

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}
