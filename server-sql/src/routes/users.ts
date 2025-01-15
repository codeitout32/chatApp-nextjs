import express from 'express'
import {Request, Response} from 'express'
import { User } from '../entity/User';
import { getFullName } from '../utils';
import { getCurrentUser, getUsers, signIn, signUp, validateUser } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

declare module "express-serve-static-core" {
    interface Request {
      user?: any;
    }
  }

router.get('/',getUsers)

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.post('/getCurrentUser', auth, getCurrentUser)
router.post('/validateUser', auth, validateUser)


export default router