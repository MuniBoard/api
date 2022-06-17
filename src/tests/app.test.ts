const supertest = require("supertest");
const app = require("../main/app").default;
describe("Get Health ", () => {
    test("It should respond with a successful response", async () => {
      const response = await supertest(app).get("/");
      expect(response.statusCode).toBe(200);
    });
  });

describe("Get API-docs", () => {
  test("It should respond with api-docs", async() => {
    const response = await supertest(app).get("/api-docs/");
    expect(response.statusCode).toBe(200);
    expect(response.text.includes("Swagger UI")).toBeTruthy();
  });
})