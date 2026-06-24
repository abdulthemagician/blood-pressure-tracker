import type { Request, Response, NextFunction } from "express";
import { AppError } from '../types/error.types.js'

export const validateBloodPressureInput = (req: Request, res: Response, next: NextFunction): void => {
    const { systolic: rawSys, diastolic: rawDia, pulse: rawPulse, note: rawNote, measured_at: rawMeasuredAt } = req.body;
    const systolic = Number(rawSys);
    const diastolic = Number(rawDia);
    const pulse = Number(rawPulse);
    const trimNote = rawNote ? String(rawNote).trim() : '';
    const note = trimNote.length > 0 ? trimNote : null;
    const measured_at = new Date(rawMeasuredAt);

    const error: string[] = [];
    if(isNaN(systolic) || isNaN(diastolic) || isNaN(pulse)){
        error.push('ค่าตัวบน, ตัวล่าง และ อัตราการเต้นหัวใจต้องเป็นตัวเลขเท่านั้น');
    }
    if(systolic <= 0 || diastolic <= 0 || pulse <= 0){
        error.push('ค่าตัวบน, ตัวล่าง และ อัตราการเต้นหัวใจต้องมากกว่า 0');
    }
    if(systolic < 50 || systolic > 300){
        error.push('ค่าตัวบน(Systolic) ต้องอยู่ระหว่าง 50 - 300 mmHg');
    }
    if(diastolic < 30 || diastolic > 200){
        error.push('ค่าตัวล่าง(Diastolic) ต้องอยู่ระหว่าง 30 - 200 mmHg');
    }
    if(pulse < 30 || pulse > 250){
        error.push('อัตราการเต้นหัวใจ(Pulse) ต้องอยู่ระห่วาง 30 - 250 bpm');
    } 
    if(systolic <= diastolic){
        error.push('ค่าตัวบนต้องมากกว่าค่าตัวล่าง');
    }

    if(error.length > 0){
        throw new AppError('กรอกข้อมูลไม่ถูกต้องตามเงื่อนไข', 404, error);
    }

    req.body = {
        systolic,
        diastolic,
        pulse,
        note,
        measured_at
    }

    next();
}