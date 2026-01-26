import { expect } from "@playwright/test";
import { test } from "../tests/utils/fixtures";

let authToken: string;

test.beforeAll("Get token", async ({ api }) => {
  // Log in the user AND get the token

  const tokenResponse = await api
    .path("/users/login")
    .body({
      user: {
        email: "dmytro.lukianchuk.lead@gmail.com",
        password: "Dluk@CBA11",
      },
    })
    .postRequest(200);
  authToken = "Token " + tokenResponse.user.token;
});

test("Get Articles", async ({ api }) => {
  const articlesResponse = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .headers({ Authorization: authToken })
    .getRequest(200);

  console.log(articlesResponse);

  expect(articlesResponse.articles.length).toBeLessThanOrEqual(10);
  expect(articlesResponse.articlesCount).toBeGreaterThanOrEqual(150);
});

test("Get Tags", async ({ api }) => {
  const tagsResponse = await api
    .path("/tags")
    .headers({ Authorization: authToken })
    .getRequest(200);

  expect(tagsResponse.tags.length).toBeLessThanOrEqual(10);
});

test("Create and Delete the Article", async ({ api }) => {
  // Create the Article
  const uniqueArticleTitle = "Article Title " + Date.now();
  const createArticleResponse = await api
    .path("/articles")
    .headers({ Authorization: authToken })
    .body({
      article: {
        title: uniqueArticleTitle,
        description: "test via UI 2",
        body: "test via UI 2",
        tagList: [],
      },
    })
    .postRequest(201);
  expect(createArticleResponse.article.title).toEqual(uniqueArticleTitle);
  const slugId = await createArticleResponse.article.slug;

  // Get the Article to verify it was created
  const articlesResponse = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .headers({ Authorization: authToken })
    .getRequest(200);

  console.log(articlesResponse);

  expect(articlesResponse.articles[0].title).toBe(uniqueArticleTitle);

  // DELETE the article
  const deleteRequest = await api
    .path(`/articles/${slugId}`)
    .headers({ Authorization: authToken })
    .deleteRequest(204)
});
