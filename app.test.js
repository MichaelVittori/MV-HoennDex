const request = require("supertest");
// we also need our app for the correct routes!
const app = require("./app");

/* All 5 of the tests I wrote are in client/src/App.test.js but I had to include at least one here for Github */
describe("GET / ", () => {
  test("It should respond with nothing", async () => {
    const response = await request(app).get("/");
    expect(response.body).toEqual({});
    expect(response.statusCode).toBe(200);
  });
});
