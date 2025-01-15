import { NextFunction, Request, Response } from "express";
import ApiError from "../types/ApiError";

const errorHandler = (error:Error, req: Request, res: Response, next: NextFunction) => {

    console.log('error handler started');
    
    if( error instanceof ApiError ) {
        return res.status(error.code).json({code: error.code, error: error.message})
    } 
     return res.status(500).json({code: 500, error: 'Something went wrong'})
}

export default errorHandler