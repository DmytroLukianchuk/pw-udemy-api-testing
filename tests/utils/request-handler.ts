import { APIRequestContext } from "@playwright/test";

export class RequestHandler {
    
    private request: APIRequestContext;
    private baseUrl: string;
    private baseUrlDefault: string;
    private apiPath: string = '';
    private apiParams: object = {};
    private apiHeaders: Record<string, string> = {};
    private apiBody: object = {};


    constructor(request: APIRequestContext, apiBaseUrl: string){
        this.request = request;
        this.baseUrl = apiBaseUrl;
        this.baseUrlDefault = apiBaseUrl;
    }

    url(url: string){
        this.baseUrl = url;
        return this;
    };

    path(path: string){
        this.apiPath = path;
        return this;
    };

    params(params: object){
        this.apiParams = params;
        return this;
    };

    headers(headers: Record<string, string>) {
        this.apiHeaders = headers;
        return this;
    };

    body(body: object){
        this.apiBody = body;
        return this;
    };

    async getRequest() {
        const url = this.getUrl();
        const response = await this.request.get(url, {
            headers: this.apiHeaders
        });
        const responseJSON = response.json();
        console.log(responseJSON)

        return response;
    }

    private getUrl(){
        const url = new URL(`${this.baseUrl ?? this.baseUrlDefault}${this.apiPath}`);
        for (const [key, value] of Object.entries(this.apiParams)){
            url.searchParams.append(key, value);
        }
        return url.toString();
    }


}