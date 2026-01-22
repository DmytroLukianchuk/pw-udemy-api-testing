import { test } from "../tests/utils/fixtures";

test("The smoke Test", async ({ api }) => {
  api
    .url("https://conduit-api.bondaracademy.com/api/")
    .path("/users/login")
    .params({ offset: 0, limit: 10 })
    .headers({ Authorization: `authToken` })
    .body({
      user: {
        email: "dmytro.lukianchuk.lead@gmail.com",
        password: "Dluk@CBA11",
      },
    });
});
