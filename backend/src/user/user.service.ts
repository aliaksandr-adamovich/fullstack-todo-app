import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity'; // убедись, что путь верный

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {
    }

    findByEmail(email: string) {
        return this.repo.findOne({
            where: {email},
            relations: ['todos'],
        });
    }

    create(data: Partial<User>) {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }
}
