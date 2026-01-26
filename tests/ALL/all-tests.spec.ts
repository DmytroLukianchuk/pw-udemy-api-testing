import { test, expect } from "@playwright/test";

let authToken: string;

test.beforeAll("log in the user and get token", async ({ request }) => {
  // Log in the user AND get the token
  const loginResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: {
          email: "dmytro.lukianchuk.lead@gmail.com",
          password: "Dluk@CBA11",
        },
      },
    },
  );

  // Get the token
  const data = await loginResponse.json();
  authToken = "Token " + data.user.token;
});

test.fixme("should get tags", async ({ request }) => {
  const getTagsResponse = await request.get(
    "https://conduit-api.bondaracademy.com/api/tags",
  );
  expect(getTagsResponse.status()).toEqual(200);

  const getTagsResponseJSON = await getTagsResponse.json();
  expect(getTagsResponse.status()).toEqual(200);
  expect(getTagsResponseJSON.tags[0]).toEqual("Test");
  expect(getTagsResponseJSON.tags.length).toBe(10);
});

test("should get articles list of a User A", async ({ request }) => {
  // Log in the user to get the token
  const loginResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: {
          email: "dmytro.lukianchuk.lead@gmail.com",
          password: "Dluk@CBA11",
        },
      },
    },
  );

  expect(loginResponse.status()).toEqual(200);

  const getArticlesResponse = await request.get(
    "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
  );
  expect(getArticlesResponse.status()).toEqual(200);

  const getArticlesResponseJSON = await getArticlesResponse.json();
  expect(getArticlesResponse.status()).toEqual(200);
  expect(getArticlesResponseJSON.articles.length).toBeGreaterThan(0);
});

test("should create an article", async ({ request }) => {
  // Create a New Article
  const uniqueArticleTitle = "Article Title " + Date.now();
  const createArticleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: uniqueArticleTitle,
          description: "test via UI 2",
          body: "test via UI 2",
          tagList: [],
        },
      },
      headers: { Authorization: authToken },
    },
  );

  const newArticleResponseJSON = await createArticleResponse.json();
  // console.log(newArticleResponseJSON);
  expect(createArticleResponse.status()).toEqual(201);

  // Check that the Article is being created
  const articlesResponse = await request.get(
    "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
    {
      headers: {
        Authorization: authToken,
      },
    },
  );

  const articlesResponseJSON = await articlesResponse.json();

  // console.log(articlesResponseJSON);
  expect(articlesResponse.status()).toEqual(200);
  expect(articlesResponseJSON.articles[0].title).toEqual(uniqueArticleTitle);
});

test.only("should create, update and delete the article", async ({
  request,
}) => {
  // Create a New Article
  const uniqueArticleTitle = "Article Title " + Date.now();
  const createArticleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: uniqueArticleTitle,
          description: "test via UI 2",
          body: "test via UI 2",
          tagList: [],
        },
      },
      headers: { Authorization: authToken },
    },
  );

  const newArticleResponseJSON = await createArticleResponse.json();
  // console.log(newArticleResponseJSON);
  expect(createArticleResponse.status()).toEqual(201);

  // Check that the Article is being created
  const articlesResponse = await request.get(
    "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
    {
      headers: {
        Authorization: authToken,
      },
    },
  );

  const articlesResponseJSON = await articlesResponse.json();

  // console.log(articlesResponseJSON);
  expect(articlesResponse.status()).toEqual(200);

  // Update the article
  const articleSlugId = await newArticleResponseJSON.article.slug;
  const updatedTitle = uniqueArticleTitle + "Modified";
  const updateArticleResponse = await request.put(
    `https://conduit-api.bondaracademy.com/api/articles/${articleSlugId}`,
    {
      data: {
        article: {
          title: updatedTitle,
          description: "test via UI 2",
          body: "test via UI 2",
          tagList: [],
        },
      },
      headers: { Authorization: authToken },
    },
  );
  expect(createArticleResponse.status()).toEqual(201);
});

test.skip("should delete the post", async ({ request }) => {
  // Create a New Article
  const uniqueArticleTitle = "Article Title " + Date.now();
  const createArticleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: uniqueArticleTitle,
          description: "test via UI 2",
          body: "test via UI 2",
          tagList: [],
        },
      },
      headers: { Authorization: authToken },
    },
  );

  const newArticleResponseJSON = await createArticleResponse.json();
  // console.log(newArticleResponseJSON);
  expect(createArticleResponse.status()).toEqual(201);

  // Check that the Article is being created
  const articlesResponse = await request.get(
    "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
    {
      headers: {
        Authorization: authToken,
      },
    },
  );

  const articlesResponseJSON = await articlesResponse.json();

  // console.log(articlesResponseJSON);
  expect(articlesResponse.status()).toEqual(200);

  // Update the article
  const articleSlugId = await newArticleResponseJSON.article.slug;
  const updatedTitle = uniqueArticleTitle + "Modified";
  const updateArticleResponse = await request.put(
    `https://conduit-api.bondaracademy.com/api/articles/${articleSlugId}`,
    {
      data: {
        article: {
          title: updatedTitle,
          description: "test via UI 2",
          body: "test via UI 2",
          tagList: [],
        },
      },
      headers: { Authorization: authToken },
    },
  );
  expect(createArticleResponse.status()).toEqual(201);

  // expect(articlesResponseJSON.articles[0].title).toEqual(updatedTitle);

  // Get the new slugID
  const updateArticleResponseJSON = await updateArticleResponse.json();
  const newSlugId = await updateArticleResponseJSON.article.slug;

  // Delete the newly updated article by slug
  expect(
    (
      await request.delete(
        `https://conduit-api.bondaracademy.com/api/articles/${newSlugId}`,
        {
          headers: {
            Authorization: authToken,
          },
        },
      )
    ).status(),
  ).toEqual(204);
});
