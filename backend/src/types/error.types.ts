export interface CustomErrorResponse {
    success: boolean;
    message: string;
    errors?: string[] | undefined;
    timestamp: string;
}

export class AppError extends Error{
    public statusCode: number;
    public errors?: string[] | undefined;

    constructor(message: string, statusCode: number, errors?: string[]){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}