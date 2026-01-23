import { test as base } from "@playwright/test";
import { RequestHandler } from "./request-handler";

export type TestOptions = {
    api: RequestHandler
}

export const test = base.extend<TestOptions>({
    api: async( {request}, use ) => {
        const requestHandler = new RequestHandler(request, 'https://conduit-api.bondaracademy.com/api'  );
        await use(requestHandler);
    }
})

