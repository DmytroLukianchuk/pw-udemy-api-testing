// import { test, expect } from '@playwright/test';

// test("GET Test Tags", async ({ request }) => {
//   const response = await request.get('https://conduit-api.bondaracademy.com/api/tags');
//   // console.log(await response.json());
//   expect(response.status()).toBe(200);
//   const data = await response.json();
//   // console.log(data);
// });

// test("GET All Articles", async ({ request }) => {
//   const response = await request.get('https://conduit-api.bondaracademy.com/api/articles');
//   expect(response.status()).toBe(200);
//   const data = await response.json();
//   // console.log(data);
// });


// test("Get Articles by Tag", async ({ request }) => {
//   const tag = "testing"; // Replace with desired tag
//   const response = await request.get(`https://conduit-api.bondaracademy.com/api/articles?tag=${tag}`);

//   expect(response.status()).toBe(200);
//   const data = await response.json();
//   // console.log(data);

// });

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
//   // console.log(data);
// });