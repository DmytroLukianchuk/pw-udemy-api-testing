import { test, expect } from '@playwright/test';

test("Create, Update and Delete the post", async ({ request }) => {
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
  const articlesResponse = await request.get("https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0", {
    headers: {
      Authorization: responseToken
    }
  });
  
  const articlesResponseJSON = await articlesResponse.json();

  // console.log(articlesResponseJSON);
  expect(articlesResponse.status()).toEqual(200);

  // Update the article 
  const articleSlugId = await newArticleResponseJSON.article.slug;
  const updatedTitle = uniqueArticleTitle + "Modified";
  const updateArticleResponse = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${articleSlugId}`, {
    data: {
      "article": { "title": updatedTitle, "description": "test via UI 2", "body": "test via UI 2", "tagList": [] }
    },
    headers: { Authorization: responseToken }
  });
  expect(createArticleResponse.status()).toEqual(201);

  // expect(articlesResponseJSON.articles[0].title).toEqual(updatedTitle);
  

  // Get the new slugID
  const updateArticleResponseJSON = await updateArticleResponse.json();
  const newSlugId = await updateArticleResponseJSON.article.slug;

  // Delete the newly updated article by slug
    expect((await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${newSlugId}`, {
      headers: {
        Authorization: responseToken
      }
    })).status()).toEqual(204);

})