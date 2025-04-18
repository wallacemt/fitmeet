type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface HttpClientConfig {
  baseUrl?: string;
  headers?: Record<string, string>;
}

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: any;
}

export class HttpClient {
  private baseURL: string;
  private headers: Record<string, string>;
  private isJson: boolean = true;
  constructor(config: HttpClientConfig = {}) {
    this.baseURL = config.baseUrl ?? "";
    this.headers = config.headers ?? {};
  }
  private buildUrl(url: string, params?: Record<string, string | number>): string {
    const query = params ? `?${new URLSearchParams(params as any).toString()}` : "";
    return `${this.baseURL}${url}${query}`;
  }

  private async request<T>(
    method: HttpMethod,
    url: string,
    options: RequestOptions = {}
  ): Promise<{
    data: T;
    status: number;
    headers: Headers;
  }> {
    const fullUrl = this.buildUrl(url, options.params);

    const isFormData = options.body instanceof FormData;

    const headers = { ...this.headers, ...options.headers };

    if (isFormData) {
      delete headers["Content-Type"];
    }

    const res = await fetch(fullUrl, {
      method,
      headers,
      body: options.body
        ? isFormData
          ? options.body 
          : JSON.stringify(options.body)
        : undefined,
    });

    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) this.isJson = true;

    let responseData: any;
    try {
      responseData = this.isJson ? await res.json() : await res.text();
    } catch (e) {
      responseData = null;
    }

    if (!res.ok) {
      const errorMessage = this.isJson
        ? responseData?.error || responseData?.message || `Erro ${res.status}`
        : responseData;

      const error = new Error(errorMessage);
      (error as any).status = res.status;
      (error as any).response = responseData;
      throw error;
    }

    return {
      data: responseData as T,
      status: res.status,
      headers: res.headers,
    };
  }

  setAuthToken(token: string) {
    this.headers["Authorization"] = `Bearer ${token}`;
  }

  get<T>(url: string, options?: RequestOptions) {
    return this.request<T>("GET", url, options);
  }

  post<T>(url: string, body?: any, options?: RequestOptions) {
    return this.request<T>("POST", url, { ...options, body });
  }

  put<T>(url: string, body?: any, options?: RequestOptions) {
    return this.request<T>("PUT", url, { ...options, body });
  }

  delete<T>(url: string, options?: RequestOptions) {
    return this.request<T>("DELETE", url, options);
  }
}
