import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Photo } from "./entity/Photo"
import { Message } from "./entity/Message"
import { Chat } from "./entity/Chat"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, Photo,Message,Chat],
    migrations: [],
    subscribers: [],
})
