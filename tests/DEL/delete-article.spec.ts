import { test, expect } from '@playwright/test';

test("Delete created post", async ({ request }) => {
    // Log in the user to get the token
  const response = await request.post("https://conduit-api.bondaracademy.com/api/users/login", {
    data: {
      "user": {
        "email": "dmytro.lukianchuk.lead@gmail.com",
        "password": "Dluk@CBA11"
      }
    },

  })
  const data = await response.json();
  // Create a New Article
  const responseToken = "Token " + data.user.token;
  const uniqueArticleTitle = "Article Title " + Date.now();
  const createArticleResponse = await request.post("https://conduit-api.bondaracademy.com/api/articles/", {
    data: {
      "article": { "title": uniqueArticleTitle, "description": "test via UI 2", "body": "test via UI 2", "tagList": [] }
    },
    headers: { Authorization: responseToken }
  });

  const newArticleResponseJSON = await createArticleResponse.json();
  // console.log(newArticleResponseJSON);
  expect(createArticleResponse.status()).toEqual(201);

  // Check that the Article is being created
  const articleResponse = await (await request.get("https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0", {
    headers: {
      Authorization: responseToken
    }
  })).json();
  // console.log(articleResponse);

  // Delete the article by slug
  const articleSlug = await newArticleResponseJSON.article.slug;

  expect((await request.get("https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0", {
      headers: {
        Authorization: responseToken
      }
    })).status()).toEqual(200);
  expect(articleResponse.articles[0].title).toEqual(uniqueArticleTitle);

  // Delete article by slug 
  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${articleSlug}`, {
  headers: {
      Authorization: responseToken
    }
})
  expect(deleteArticleResponse.status()).toEqual(204);

})