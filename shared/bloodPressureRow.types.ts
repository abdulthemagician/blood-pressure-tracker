export interface bloodPressureRow {
    id: number;
    systolic: number;
    diastolic: number;
    pulse: number;
    measured_at: Date;
    note?: string;
}

export interface bloodPressureInput {
    systolic: number;
    diastolic: number;
    pulse: number;
    measured_at: Date;
    note?: string;
}