import { Request, Response } from "express";
import { User } from "../entity/User";
import { getFullName } from "../utils";
import ApiError from "../types/ApiError";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config/constants";

export const getUsers =async (req:Request, res: Response) => {
    const users = await User.find()

    const userData = users.map((user) => {
        const {password: remove, ...userData} = user
        return {...userData, name: getFullName(user)}
    })

    res.status(200).json(userData)
}

export const signUp = async (req:Request, res: Response, next) => {
    try {
        console.log('request body', req.body);
    const {firstName, lastName, email, password} = req.body

    if(!firstName || !lastName || !email || !password){
        console.log('caught error 2');
        
    throw ApiError.badRequest('Request data incomplete')
}
    const doesExist = Boolean(await User.findOneBy({email}))
    if(doesExist) throw ApiError.badRequest('Email Already Exist')

    const hashedPassword = await bcryptjs.hash(password,12)

    const newUser = new User()

    newUser.email = email
    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.password = hashedPassword
    await newUser.save()

    const {password: notinclud, ...userData} = newUser
    const name = getFullName(newUser)
    const token = jwt.sign({
        id: newUser.id
      }, SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({
        ...userData, name, token
      })

    } catch (error) {
        // throw {message: error.message, code: 500}
        next(error)
    }
}


export const signIn = async (req:Request, res: Response, next) => {
    try {
        console.log('request body', req.body);
    const { email, password} = req.body

    if(!email || !password){
        console.log('caught error 2');
        
    throw ApiError.badRequest('Request data incomplete')
}
    const user = await User.findOneBy({email})
    if(!user) throw ApiError.badRequest('Email does not Exist')

    const isPasswordCorrect = await bcryptjs.compare(password,user.password)

    if(!isPasswordCorrect) throw ApiError.badRequest('Incorrect Password')

    const {password: remove, ...userData} = user
    const name = getFullName(user)
    const token = jwt.sign({
        id: user.id
      }, SECRET_KEY, { expiresIn: '1d' });

      res.status(200).json({
        ...userData, name, token
      })

    } catch (error) {
        // throw {message: error.message, code: 500}
        next(error)
    }
}

export const getCurrentUser =async (req:Request,res: Response, next) => {
    const name = getFullName(req.user)
    res.status(200).json({
        name,
        ...req.user
    })
}

export const validateUser =async (req:Request, res: Response, next) => {
    // console.log('validate body', req.body, req.user);
    
    res.status(200).json({isValid: true})
}
