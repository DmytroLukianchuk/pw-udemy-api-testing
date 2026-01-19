import { test, expect } from '@playwright/test';

// test("Get token", async ({ request }) => {
//   const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
//     data: {
//       user: {
//         email: "dmytro.lukianchuk.lead@gmail.com",
//         password: "Dluk@CBA11"
//       }
//     }
//   });
//   expect(response.status()).toBe(200);
//   const data = await response.json();
//   console.log(data);
// });

test("Create a new post", async ({ request }) => {
  const response = await request.post("https://conduit-api.bondaracademy.com/api/users/login", {
    data: {
      "user": {
        "email": "dmytro.lukianchuk.lead@gmail.com",
        "password": "Dluk@CBA11"
      }
    },

  })
  const data = await response.json();
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

  const getArticleResponse = await request.get("https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0", {
    headers: {
      Authorization: responseToken
    }
  })
  const getArticleResponseJSON = await getArticleResponse.json();
  // console.log(getArticleResponseJSON);

  expect(getArticleResponse.status()).toEqual(200);
  expect(getArticleResponseJSON.articles[0].title).toEqual(uniqueArticleTitle);


});