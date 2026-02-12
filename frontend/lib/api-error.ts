import type {
  ProblemDetails,
  ValidationProblemDetails,
} from "./types/problem-details";

export class ApiError extends Error {
  public readonly status: number;
  public readonly problemDetails: ProblemDetails | ValidationProblemDetails;

  constructor(
    status: number,
    problemDetails: ProblemDetails | ValidationProblemDetails,
  ) {
    super(problemDetails.title);
    this.name = "ApiError";
    this.status = status;
    this.problemDetails = problemDetails;
  }

  getUserMessage(): string {
    if (this.problemDetails.detail) {
      return this.problemDetails.detail;
    }

    if ("errors" in this.problemDetails && this.problemDetails.errors) {
      const errors = this.problemDetails.errors
        .map((error) => `${error.field}: ${error.message}`)
        .join("\n");
      return `入力エラー:\n${errors}`;
    }

    return this.problemDetails.title;
  }
}

export class NetworkError extends Error {
  constructor(message = "ネットワークエラーが発生しました") {
    super(message);
    this.name = "NetworkError";
  }
}
