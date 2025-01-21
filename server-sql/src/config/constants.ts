import dotEnv from "dotenv"


dotEnv.config();

export const SECRET_KEY = process.env.SECRET_KEY
export const CLIENT_URL = process.env.CLIENT_URL
export const PORT = process.env.PORT 
export const POSTGRES = {
    HOST: process.env.PG_HOST,
    PORT:   process.env.PG_PORT,
    USERNAME: process.env.PG_USERNAME,
    PASSWORD: process.env.PG_PASSWORD,
    DATABASE: process.env.PG_DATABASE,
}
