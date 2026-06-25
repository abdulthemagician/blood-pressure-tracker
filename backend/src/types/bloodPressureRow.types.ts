import { type RowDataPacket } from 'mysql2/promise';

export interface bloodPressureRow extends RowDataPacket {
    id: number;
    systolic: number;
    diastolic: number;
    pulse: number;
    measured_at: Date;
    note?: string;
}

export interface bloodPressureInput{
    systolic: number;
    diastolic: number;
    pulse: number;
    measured_at: Date;
    note?: string;
}