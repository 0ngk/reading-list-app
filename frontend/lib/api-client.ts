import { ApiError, NetworkError } from "./api-error";
import { config } from "./config";
import type {
  ProblemDetails,
  ValidationProblemDetails,
} from "./types/problem-details";

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type");

    if (!response.ok && contentType?.includes("application/problem+json")) {
      const problemDetails: ProblemDetails | ValidationProblemDetails =
        await response.json();
      throw new ApiError(response.status, problemDetails);
    }

    if (contentType?.includes("application/json")) {
      if (!response.ok) {
        const fallbackProblem: ProblemDetails = {
          title: `HTTP ${response.status} エラー`,
          status: response.status,
          detail: response.statusText || "サーバーエラーが発生しました",
        };
        throw new ApiError(response.status, fallbackProblem);
      }
      return response.json();
    }

    if (!response.ok) {
      const text = await response.text();
      const fallbackProblem: ProblemDetails = {
        title: `HTTP ${response.status} エラー`,
        status: response.status,
        detail: text || response.statusText || "サーバーエラーが発生しました",
      };
      throw new ApiError(response.status, fallbackProblem);
    }

    return response.json();
  }

  async get<T>(path: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new NetworkError("ネットワーク接続を確認してください");
    }
  }

  async post<T, D = unknown>(path: string, data: D): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new NetworkError("ネットワーク接続を確認してください");
    }
  }

  async put<T, D = unknown>(path: string, data: D): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new NetworkError("ネットワーク接続を確認してください");
    }
  }

  async delete<T>(path: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new NetworkError("ネットワーク接続を確認してください");
    }
  }
}

export const apiClient = new ApiClient(config.apiUrl);
