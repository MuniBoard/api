const supertest = require("supertest");
const app = require("../source/app").default;
describe("GET / ", () => {
    test("It should respond with an array of students", async () => {
      const response = await supertest(app).get("/");
      expect(response.statusCode).toBe(200);
    });
  });