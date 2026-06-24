import type { Request, Response, NextFunction } from 'express';
import { AppError, type CustomErrorResponse } from '../types/error.types.js';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    //instanceof คือการเช็คว่า object ตัวไหนเกิดจาก class ไหน เช่น err เกิดจาก class AppError ไหม
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err instanceof AppError ? err.message : err.message || 'Internal Server Error';
    const errorDetails = err instanceof AppError ? err.errors : undefined;

    console.error(`[Error] [${req.method}] ${req.url}`);

    const errorResponse: CustomErrorResponse = {
        success: false,
        message: message,
        errors: errorDetails,
        timestamp: new Date().toLocaleString('th-TH')
    };
    
    res.status(statusCode).json(errorResponse);
}