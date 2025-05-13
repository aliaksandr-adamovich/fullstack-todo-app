import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Todo} from '../todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly repo: Repository<Todo>,
    ) {
    }

    async findAll(): Promise<Todo[]> {
        return this.repo.find();
    }

    async create(dto: CreateTodoDto): Promise<Todo> {
        const todo = this.repo.create(dto);
        return this.repo.save(todo);
    }
    async update(id: number, dto: UpdateTodoDto): Promise<Todo> {
        const todo = await this.repo.findOneByOrFail({ id });
        Object.assign(todo, dto);
        return this.repo.save(todo);
    }

    async toggle(id: number): Promise<Todo> {
        try {
            const todo = await this.repo.findOneByOrFail({id});
            todo.completed = !todo.completed;
            return this.repo.save(todo);
        } catch (error) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
    }


    async delete(id: number): Promise<void> {
        await this.repo.delete(id);
    }
}
