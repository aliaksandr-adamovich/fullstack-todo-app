import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn, JoinColumn,
} from 'typeorm';
import {User} from '../user/user.entity';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.todos, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'id_user'})
    user: User;

    @Column()
    title: string;

    @Column({default: false})
    completed: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}
