import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app";

const api = supertest(app);

describe("GET /", () => {
  it("should return 200", async () => {
    await api.get("/").expect(200);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
