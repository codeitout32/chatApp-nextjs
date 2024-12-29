import express from 'express'
import {Request, Response} from 'express'
import { User } from '../entity/User';
import { getFullName } from '../utils';
import { getUsers, signIn, signUp } from '../controllers/userController';

const router = express.Router();

router.get('/',getUsers)

router.post('/signUp', signUp)
router.post('/signIn', signIn)


export default router