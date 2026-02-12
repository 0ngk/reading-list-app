import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import type { Request, Response } from "express";
import type { ProblemDetails } from "../types/problem-details";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (
      typeof exceptionResponse === "object" &&
      exceptionResponse !== null &&
      "type" in exceptionResponse &&
      exceptionResponse.type === "/problems/validation-error"
    ) {
      response
        .status(status)
        .contentType("application/problem+json")
        .json(exceptionResponse);
      return;
    }

    const message =
      typeof exceptionResponse === "string"
        ? exceptionResponse
        : typeof exceptionResponse === "object" &&
            exceptionResponse !== null &&
            "message" in exceptionResponse &&
            typeof exceptionResponse.message === "string"
          ? exceptionResponse.message
          : exception.message;

    const problemDetails: ProblemDetails = {
      type: this.getTypeFromStatus(status),
      title: this.getTitleFromStatus(status),
      status,
      detail: Array.isArray(message) ? message.join(", ") : message,
      instance: request.url,
    };

    response
      .status(status)
      .contentType("application/problem+json")
      .json(problemDetails);
  }

  private getTypeFromStatus(status: number): string {
    const typeMap: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: "/problems/bad-request",
      [HttpStatus.UNAUTHORIZED]: "/problems/unauthorized",
      [HttpStatus.FORBIDDEN]: "/problems/forbidden",
      [HttpStatus.NOT_FOUND]: "/problems/not-found",
      [HttpStatus.CONFLICT]: "/problems/conflict",
      [HttpStatus.INTERNAL_SERVER_ERROR]: "/problems/internal-server-error",
    };

    return typeMap[status] || "/problems/error";
  }

  private getTitleFromStatus(status: number): string {
    const titleMap: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: "Bad Request",
      [HttpStatus.UNAUTHORIZED]: "Unauthorized",
      [HttpStatus.FORBIDDEN]: "Forbidden",
      [HttpStatus.NOT_FOUND]: "Not Found",
      [HttpStatus.CONFLICT]: "Conflict",
      [HttpStatus.INTERNAL_SERVER_ERROR]: "Internal Server Error",
    };

    return titleMap[status] || "Error";
  }
}
