import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Chat } from "./Chat";


@Entity('messages')
export class Message extends BaseEntity{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number

    @Column({
        length: 255,
    })
    text: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, (user) => user.messages)
    sender: User

    @ManyToOne(() => Chat, (chat) => chat.messages, {onDelete: 'CASCADE'})
    chat: Chat
}