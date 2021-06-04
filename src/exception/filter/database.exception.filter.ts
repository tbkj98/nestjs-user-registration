import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { DatabaseException } from "../database.exception";
import { UserAlreadyExistsException } from "../useralreadyexists.exception";

@Catch(UserAlreadyExistsException, DatabaseException)
export class DatabaseExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        exception = exception as Error;

        const responseBody = {
            timestamp: new Date().toISOString(),
            path: request.url,
            statusCode: 200,
            message: "Something went wrong."
        };

        switch (exception.name) {
            case UserAlreadyExistsException.name: responseBody.statusCode = HttpStatus.BAD_REQUEST; responseBody.message = exception.message
                break;
            case DatabaseException.name: responseBody.message = (exception as DatabaseException).message
                break;
        };
        response.json(responseBody);
    }
}