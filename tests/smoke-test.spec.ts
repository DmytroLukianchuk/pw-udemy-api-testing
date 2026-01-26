import { expect } from "@playwright/test";
import { test } from "../tests/utils/fixtures";

test("The Get Articles", async ({ api }) => {
  const response = await api
    .path("/articles")
    .params({ offset: 0, limit: 10 })
    .getRequest(200);

    expect(response.articles.length).toBeGreaterThan(0);
    // expect(response.articles.lenght)
  
  
  })