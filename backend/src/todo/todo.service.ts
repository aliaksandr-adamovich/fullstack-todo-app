import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Todo} from './todo.entity';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly repo: Repository<Todo>,
    ) {
    }

    async findAllForUser(userId: number): Promise<Todo[]> {
        return this.repo.find({
            where: {user: {id: userId}},
            order: {id: 'DESC'},
        });
    }

    async create(dto: CreateTodoDto, userId: number): Promise<Todo> {
        const todo = this.repo.create({
            ...dto,
            user: {id: userId},
        });
        return this.repo.save(todo);
    }

    async update(id: number, dto: UpdateTodoDto, userId: number): Promise<Todo> {
        const todo = await this.repo.findOneByOrFail({id, user: {id: userId}});
        Object.assign(todo, dto);
        return this.repo.save(todo);
    }

    async toggle(id: number, userId: number): Promise<Todo> {
        const todo = await this.repo.findOneByOrFail({id, user: {id: userId}});
        todo.completed = !todo.completed;
        return this.repo.save(todo);
    }

    async delete(id: number, userId: number): Promise<void> {
        const todo = await this.repo.findOneByOrFail({id, user: {id: userId}});
        await this.repo.remove(todo);
    }
}
