import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Chat, ChatType } from "../entity/Chat";
import { getFullName } from "../utils";
import ApiError from "../types/ApiError";
import { User, UserRole } from "../entity/User";
import { Message } from "../entity/Message";

export const getChats = async (req: Request, res: Response, next) => {
  try {
    

  const user = req.user;

  const chats = await AppDataSource.getRepository(Chat)
    .createQueryBuilder("chats")
    .innerJoinAndSelect("chats.members", "members")
    .leftJoinAndSelect("chats.messages", "messages")
    .leftJoinAndSelect("chats.recentMessage", "recentMessage")
    .leftJoinAndSelect("recentMessage.sender", "recentSender")
    .leftJoinAndSelect("chats.owner", "owner")
    .leftJoinAndSelect("messages.sender", "sender")
    .getMany();

  const chatsData = chats
    .filter((chat) => chat.members.find((member) => member.id === user.id))
    .map((chat) => {
      const { owner: remove, ...chatsData } = chat;

      return {
        ...chatsData,
        ownerId: chat.type === ChatType.GROUP ? chat.owner.id : null,
        recentMessage: chat.recentMessage
          ? {
              ...chat.recentMessage,
              sender: {
                id: chat.recentMessage.sender.id,
                name: getFullName(chat.recentMessage.sender),
              },
            }
          : null,
        members: chat.members.map((member) => {
          return { id: member.id, name: getFullName(member) };
        }),
        messages: chat.messages.map((message) => {
          return {
            ...message,
            sender: {
              id: message.sender.id,
              name: getFullName(message.sender),
            },
          };
        }),
      };
    });

  res.status(200).json(chatsData);

} catch (error) {
  next(error)
}
};


export const createPrivateChat =async  (req: Request, res: Response, next) => {
  try {
    
  
  const creator = req.user;
  const {email} = req.body

  

  if(!email) throw ApiError.badRequest('Request  data incomplete')

  if(email === creator.email) throw ApiError.methodNotAllowed('Cannot create a chat with your own account')
  
  
  
  const otherUser = await User.findOneBy({email})
  if(!otherUser) throw ApiError.notFound('User not found')
  console.log('create private chat', email, creator );
  if (otherUser.role !== UserRole.USER)
  throw ApiError.methodNotAllowed('Creating such chat is not allowed')  
  
  const chats = await AppDataSource.getRepository(Chat)
    .createQueryBuilder("chats")
    .innerJoinAndSelect("chats.members", "members")
  .where("chats.type = 'private'")
    .getMany();

    const doesChatExist = chats.find((chat) => chat.members.find((member) => member.id == creator.id) && chat.members.find(member => member.id === otherUser.id))

    if(doesChatExist) throw ApiError.methodNotAllowed('Chat already exists')

    const newChat = new Chat()
    newChat.members = [creator, otherUser]
    newChat.type = ChatType.PRIVATE
    await newChat.save()

    const newChatData = {
      id: newChat.id,
      ownerId: null,
      name: null,
      type: newChat.type,
      members: newChat.members.map(member => {
        return {id: member.id, name: getFullName(member)}
      }),
      messages: [],
      createdAt: newChat.createdAt
    }
  

  res.status(200).json(newChatData);

} catch (error) {
 next(error)   
}
};
export const createMessage =async  (req: Request, res: Response, next) => {
  try {
    
  
  const user = req.user;
  const {text} = req.body
  const {chatId} = req.params

  

  if(!chatId || !text) throw ApiError.badRequest('Request  data incomplete')
  if(!parseInt(chatId)) throw ApiError.badRequest('Invalid Chat id')

  const chat = await AppDataSource.getRepository(Chat)
  .createQueryBuilder("chats")
  .innerJoinAndSelect("chats.members", "members")
.where("chats.id = :chatId", {chatId})
  .getOne();


  if(!chat) throw ApiError.methodNotAllowed('Chat not found')
  
  const isMember = chat.members.find(member => member.id == user.id)
  if(!isMember) throw ApiError.forbidden('User is not a chat member')

  const newMessage = new Message()
  newMessage.sender = user
  newMessage.chat = chat
  newMessage.text = text
  await newMessage.save()
  
  chat.recentMessage = newMessage
  await chat.save()

  const newMessageDate = {
    id: newMessage.id,
    text: newMessage.text,
    createdAt: newMessage.createdAt,
    sender: {
      id: newMessage.sender.id,
      name: getFullName(newMessage.sender)
    }
  }
  res.status(200).json(newMessageDate);

} catch (error) {
 next(error)   
}
};