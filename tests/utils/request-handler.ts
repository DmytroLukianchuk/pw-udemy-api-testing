import { APIRequestContext, expect } from "@playwright/test";
import { APILogger } from "./logger";

export class RequestHandler {
  private request: APIRequestContext;
  private logger: APILogger;
  private baseUrl: string;
  private baseUrlDefault: string;
  private apiPath: string = "";
  private apiParams: object = {};
  private apiHeaders: Record<string, string> = {};
  private apiBody: object = {};

  constructor(
    request: APIRequestContext,
    apiBaseUrl: string,
    logger: APILogger,
  ) {
    this.request = request;
    this.baseUrl = apiBaseUrl;
    this.baseUrlDefault = apiBaseUrl;
    this.logger = logger;
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
    this.logger.logRequest("GET", url, this.apiHeaders);
    const response = await this.request.get(url, {
      headers: this.apiHeaders,
    });
    const actualStatus = response.status();
    const responseJSON = await response.json();
    this.statusCodeValidator(actualStatus, statusCode, this.getRequest);
    this.logger.logResponse(actualStatus, responseJSON);
    
    return responseJSON;
  }

  async postRequest(statusCode: number) {
    const url = this.getUrl();
    this.logger.logRequest("POST", url, this.apiHeaders, this.apiBody);
    const response = await this.request.post(url, {
      headers: this.apiHeaders,
      data: this.apiBody,
    });

    const actualStatus = response.status();
    const responseJSON = await response.json();
    this.logger.logResponse(actualStatus, responseJSON);
    this.statusCodeValidator(actualStatus, statusCode, this.postRequest);

    return responseJSON;
  }

  async putRequest(statusCode: number) {
    const url = this.getUrl();
    this.logger.logRequest("PUT", url, this.apiHeaders, this.apiBody);
    const response = await this.request.put(url, {
      headers: this.apiHeaders,
      data: this.apiBody,
    });

    const actualStatus = response.status();
    const responseJSON = await response.json();
    this.logger.logResponse(actualStatus, responseJSON);
    this.statusCodeValidator(actualStatus, statusCode, this.putRequest);

    return responseJSON;
  }

  async deleteRequest(statusCode: number) {
    const url = this.getUrl();
    this.logger.logRequest("DELETE", url, this.apiHeaders);
    const response = await this.request.delete(url, {
      headers: this.apiHeaders,
    });

    const actualStatus = response.status();
    this.logger.logResponse(actualStatus);
    this.statusCodeValidator(actualStatus, statusCode, this.deleteRequest);

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

  private statusCodeValidator(
    actualStatus: number,
    expectedStatus: number,
    callingMethod: Function
  ) {
    if (actualStatus !== expectedStatus) {
      const logs = this.logger.getRecentLogs();
      const error = new Error(
        `Expected status code ${expectedStatus} but received ${actualStatus}.\n\nRecent API Logs:\n${logs}`);
      Error.captureStackTrace(error, callingMethod);
      throw error;
    }
  }
}
