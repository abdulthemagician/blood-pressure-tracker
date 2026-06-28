import type { Response } from 'express';
import type { bloodPressureRow, bloodPressureInput } from '../../../shared/bloodPressureRow.types.js';

export const sendSuccessWithData = (res: Response, message: string, data: any = null, statusCode: number = 200): Response => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        ...(data != null && {data: data}),
        timestamp: new Date().toLocaleString('th-TH')
    });
}

export const dataResponse = (res: Response, data: bloodPressureRow[] | bloodPressureInput, statusCode: number = 200) => {
    return res.status(statusCode).json(data);
}