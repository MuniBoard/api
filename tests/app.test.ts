const supertest = require("supertest");
const app = require("../source/app").default;
describe("GET / ", () => {
    test("API Works", async () => {
      const response = await supertest(app).get("/");
      expect(response.statusCode).toBe(200);
    });
  });