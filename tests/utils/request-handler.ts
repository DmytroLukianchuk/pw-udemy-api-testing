import { APIRequestContext, expect } from "@playwright/test";

export class RequestHandler {
  private request: APIRequestContext;
  private baseUrl: string;
  private baseUrlDefault: string;
  private apiPath: string = "";
  private apiParams: object = {};
  private apiHeaders: Record<string, string> = {};
  private apiBody: object = {};

  constructor(request: APIRequestContext, apiBaseUrl: string) {
    this.request = request;
    this.baseUrl = apiBaseUrl;
    this.baseUrlDefault = apiBaseUrl;
  }

  url(url: string) {
    this.baseUrl = url;
    return this;
  }

  path(path: string) {
    this.apiPath = path;
    return this;
  }

  params(params: object) {
    this.apiParams = params;
    return this;
  }

  headers(headers: Record<string, string>) {
    this.apiHeaders = headers;
    return this;
  }

  body(body: object) {
    this.apiBody = body;
    return this;
  }

  async getRequest(statusCode: number) {
    const url = this.getUrl();
    const response = await this.request.get(url, {
      headers: this.apiHeaders,
    });
    expect(response.status()).toEqual(statusCode);
    const responseJSON = await response.json();
    console.log(responseJSON);

    return responseJSON;
  }

  async postRequest(statusCode: number) {
    const url = this.getUrl();
    const response = await this.request.post(url, {
      headers: this.apiHeaders,
      data: this.apiBody,
    });
    expect(response.status()).toEqual(statusCode);
    const responseJSON = await response.json();
    console.log(responseJSON);

    return responseJSON;
  }

  async putRequest(statusCode: number) {
    const url = this.getUrl();
    const response = await this.request.put(url, {
      headers: this.apiHeaders,
    });
    expect(response.status()).toEqual(statusCode);
    const responseJSON = await response.json();
    console.log(responseJSON);

    return responseJSON;
  }

  async deleteRequest(statusCode: number) {
    const url = this.getUrl();
    const response = await this.request.delete(url, {
      headers: this.apiHeaders,
    });
    expect(response.status()).toEqual(statusCode);

    // 204 No Content responses have no body
    if (statusCode === 204) {
      return null;
    }

    const responseJSON = await response.json();
    console.log(responseJSON);

    return responseJSON;
  }

  private getUrl() {
    const url = new URL(
      `${this.baseUrl ?? this.baseUrlDefault}${this.apiPath}`,
    );
    for (const [key, value] of Object.entries(this.apiParams)) {
      url.searchParams.append(key, value);
    }
    return url.toString();
  }
}
