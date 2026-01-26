import { expect } from "@playwright/test";
import { test } from "../tests/utils/fixtures";

// let authToken: string

// test.beforeAll('Get token', async({ api }) => {
//   // Log in the user AND get the token

//   const tokenResponse = await api
//         .path('/user/login')
//         .body({"user": { "email": "dmytro.lukianchuk.lead@gmail.com", "password": "Dluk@CBA11" } })
//         .postRequest(200);
//     authToken = 'Token ' + tokenResponse.user.token;
// });

test("Get Articles", async ({ api }) => {
  const response = await api
    .path("/articles")
    .params({ limit: 10, offset: 0  })
    // .headers({ Authorization: authToken })
    .getRequest(200)

    expect(response.articles.length).toBeGreaterThan(0);
    expect(response.articlesCount).toEqual(10);
  
  
  })