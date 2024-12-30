import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Chat, ChatType } from "../entity/Chat";
import { getFullName } from "../utils";


export const getChats = async (req: Request, res: Response) => {
    const user = req.body.user

    const chats = await AppDataSource.getRepository(Chat).
    createQueryBuilder('chats').innerJoinAndSelect('chats.members', 'members')
    .leftJoinAndSelect('chats.messages','messages').leftJoinAndSelect('chats.recentMessage','recentMessage').leftJoinAndSelect('recentMessage.sender','recentSender').leftJoinAndSelect('chats.owner', 'owner').leftJoinAndSelect('messages.sender', 'sender').getMany()

    const chatsData = chats
    .filter((chat)=> chat.members.find((member)=> member.id === user.id)).map((chat) => {
        const {owner: remove, ...chatsData} = chat

        return {
            ...chatsData,
            ownerId: chat.type === ChatType.GROUP ? chat.owner.id: null,
            recentMessage: chat.recentMessage ? {
                ...chat.recentMessage,
                sender: {
                    id: chat.recentMessage.sender.id,
                    name: getFullName(chat.recentMessage.sender)
                },
            } : null,
            members: chat.members.map(member => {
                return {id: member.id, name: getFullName(member)}
            }),
            messages: chat.messages.map(message => {
                return {
                    ...message,
                    sender: {
                        id: message.sender.id,
                        name: getFullName(message.sender)
                    }
                }
            })
        }
    })

    res.status(200).json(chatsData)
}