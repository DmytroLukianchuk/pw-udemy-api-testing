import { APIRequestContext } from "@playwright/test";

export class RequestHandler {
    
    private baseUrl: string;
    private baseUrlDefault: string;
    private apiPath: string = '';
    private apiParams: object = {};
    private apiHeaders: object = {};
    private apiBody: object = {};


    constructor(request: APIRequestContext, apiBaseUrl: string){
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

    headers(headers: object) {
        this.apiHeaders = headers;
        return this;
    };

    body(body: object){
        this.apiBody = body;
        return this;
    };

        private getUrl(){
            const url = new URL(`${this.baseUrl ?? this.baseUrlDefault}${this.apiPath}`);
            for (const [key, value] of Object.entries(this.apiParams)){
                url.searchParams.append(key, value);
            }
            return url.toString();
        }


}