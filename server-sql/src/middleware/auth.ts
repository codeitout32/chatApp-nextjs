import { Request } from "express"
import ApiError from "../types/ApiError";
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config/constants";
import { User } from "../entity/User";


export const auth = async (req: Request, res, next) => {
    const authHeader = req.headers.authorization.split(' ')
    const token = authHeader[0] == 'Bearer' && authHeader[1];

    if(!token) throw ApiError.badRequest('Token Not Provided');

    const decoded = jwt.verify(token, SECRET_KEY)

    if(typeof decoded === 'string') throw ApiError.badRequest('Invalid token')

    const user = await User.findOneBy({id: decoded?.id})

    if(!user) return res.status(401).json({message: 'Account not found'})

    // if(user.isBlocked)

    req.user = user
    next()
} 