import type { ResultSetHeader } from 'mysql2';
import db from '../config/db.js';
import type { bloodPressureRow, bloodPressureInput } from '../types/bloodPressureRow.types.js';

export const getAllBloodPressure = async (): Promise<bloodPressureRow[]> => {
    try{
        const [rows] = await db.query<bloodPressureRow[]>('SELECT id, systolic, diastolic, pulse, measured_at, note FROM blood_pressure;');
        return rows;
    }catch(error){
        console.log('Database Query Error at getAllBloodPressure:', error);
        throw error;
    }
}

export const createBloodPressure = async (data: bloodPressureInput): Promise<number> => {
    try{
        const { systolic, diastolic, pulse, note, measured_at } = data;
        const [result] = await db.execute<ResultSetHeader>(
            'INSERT INTO blood_pressure (systolic, diastolic, pulse, note, measured_at) VALUE (?, ?, ?, ?, ?)',
            [systolic, diastolic, pulse, note || null, new Date(measured_at)]
        );
        return result.insertId;
    }catch(error){
        console.log('Database Query Error at createBloodPressure:', error);
        throw error;
    }
}

export const updateBloodPressure = async (data: bloodPressureInput, id: number): Promise<number> => {
    try{
        const { systolic, diastolic, pulse, note, measured_at } = data;
        const [result] = await db.execute<ResultSetHeader>(
            `UPDATE blood_pressure
            SET systolic = ?, diastolic = ?, pulse = ?, note = ?, measured_at = ?
            WHERE id = ?
            `,
            [systolic, diastolic, pulse, note || null, new Date(measured_at), id]
        );
        return result.affectedRows;
    }catch(error){
        console.log('Database Query Error at updateBloodPressure:', error);
        throw error;
    }
}

export const deleteBloodPressure = async (id: number): Promise<bloodPressureRow | null> => {
    try{
        const [rows] = await db.query<bloodPressureRow[]>('SELECT id, systolic, diastolic, pulse, measured_at, note FROM blood_pressure WHERE id = ?', [id]);
        if(rows.length === 0) return null;
        const result = rows[0] as bloodPressureRow;
        await db.execute<ResultSetHeader>(
            `DELETE FROM blood_pressure WHERE id = ?`,
            [id]
        );
        return result;
    }catch(error){
        console.log('Database Query Error at deleteBloodPressure:', error);
        throw error;
    }
}