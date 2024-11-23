export class ThrowError {
    code: string;
    message: string;
    meta?: unknown
}

export class CustomThrowError extends Error implements ThrowError {
    code: string;
    message: string;
    meta?: unknown

    constructor(code: string, message: string, meta?: unknown) {
        super(message);
        this.code = code;
        this.message = message;
        if (meta) this.meta = meta;
        Object.setPrototypeOf(this, CustomThrowError.prototype);
    }
}