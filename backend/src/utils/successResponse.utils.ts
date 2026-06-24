import type { Response } from 'express';

export const sendSuccess = (res: Response, message: string, data: any = null, statusCode: number = 200): Response => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        ...(data != null && {data: data}),
        timestamp: new Date().toLocaleString('th-TH')
    });
}