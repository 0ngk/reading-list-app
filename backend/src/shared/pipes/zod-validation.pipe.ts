import type { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";
import { ZodError, type ZodSchema } from "zod";
import type {
  ValidationErrorDetail,
  ValidationProblemDetails,
} from "../types/problem-details";
import { ProblemTypes } from "../types/problem-details";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, _metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: ValidationErrorDetail[] = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        const problemDetails: ValidationProblemDetails = {
          type: ProblemTypes.VALIDATION_ERROR,
          title: "Validation Failed",
          status: 400,
          detail: "One or more fields failed validation",
          errors,
        };

        throw new BadRequestException(problemDetails);
      }
      throw new BadRequestException("Validation failed");
    }
  }
}
