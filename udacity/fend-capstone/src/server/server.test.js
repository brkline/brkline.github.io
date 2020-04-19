const request = require("supertest");
const app = require("./server");

describe("Test the root path", () => {
    test("It should respond to the GET request", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
  });