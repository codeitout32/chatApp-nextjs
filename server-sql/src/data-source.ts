import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Photo } from "./entity/Photo"
import { Message } from "./entity/Message"
import { Chat } from "./entity/Chat"
import { POSTGRES } from "./config/constants"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: POSTGRES.HOST,
    port: Number(POSTGRES.PORT),
    username: POSTGRES.USERNAME,
    password: POSTGRES.PASSWORD,
    database: POSTGRES.DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Photo,Message,Chat],
    migrations: [],
    subscribers: [],
})
