interface AError {
    message:string,
    status:number,
    cause?:unknown
}

class ApplicationError extends Error implements AError {
    constructor(message:string,public status:number,cause?:unknown){
        super(message,{cause})
    }
}

export class BadRequestError extends ApplicationError {
    constructor(message:string,cause?:unknown){
        super(message,400,cause)
    }
}

export class NotFoundError extends ApplicationError {
    constructor(message:string,cause?:unknown){
        super(message,404,cause)
    }
}

export class ConflictError extends ApplicationError {
    constructor(message:string,cause?:unknown){
        super(message,409,cause)
    }
}