import type { Request, Response, NextFunction } from 'express';
import * as model from '../model/bloodPressure.model.js';
import type { bloodPressureRow } from '../types/bloodPressureRow.types.js';
import { AppError } from '../types/error.types.js';
import { sendSuccess } from '../utils/successResponse.utils.js';

export const getAllBloodPressure = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await model.getAllBloodPressure();
        sendSuccess(res, 'GET All Success', result);
    } catch (error) {
        next(error);
    }
}

export const createBloodPressure = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const bloodPressureInput: bloodPressureRow = req.body;
        const result = await model.createBloodPressure(bloodPressureInput);
        sendSuccess(res, 'Insert Success', `insertID: ${result}`);
    }catch(error){
        next(error);
    }
}

export const updateBloodPressure = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const id: number = Number(req.params.id);
        const bloodPressureInput: bloodPressureRow = req.body;
        const affectedRows = await model.updateBloodPressure(bloodPressureInput, id);
        if(affectedRows === 0){
            throw new AppError(`ไม่พบ ID: ${id} ที่ฐานข้อมูล`, 404);
        }
        sendSuccess(res, 'Update Sucess', bloodPressureInput);
    }catch(error){
        next(error);
    }
}

export const deleteBloodPressure = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const id: number = Number(req.params.id);
        const result = await model.deleteBloodPressure(id);
        if(result === null){
            throw new AppError(`ไม่พบ ID: ${id} ที่ฐานข้อมูล`, 404);
        }
        sendSuccess(res, 'Delete Success', result);
    }catch(error){
        next(error);
    }
}