export interface ProblemDetails {
  type?: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
}

export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export interface ValidationProblemDetails extends ProblemDetails {
  errors?: ValidationErrorDetail[];
}
