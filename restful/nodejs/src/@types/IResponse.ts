export class IResponse {
    message: string;
    success: boolean;
    data?: null | Object;

    constructor(message: string, success: boolean, data?: null | Object) {
        this.message = message;
        this.success = success;
        this.data = data;
    }
}