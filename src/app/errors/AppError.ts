 class AppError extends Error{
    public statusCodes:number;
    constructor(statusCode:number,message:string, stack=''){
        super(message);
        this.statusCodes = statusCode;

            if(stack){
                this.stack =stack;
            }else{  
                Error.captureStackTrace(this,this.constructor)
            }
    }

}

export default AppError;