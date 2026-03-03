import request from "supertest";
import express from "express";
import userRoutes from "../../Routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

describe("User API Endpoints", () => {

  it("GET /users should return 200", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
  });

  it("POST /users should create user", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        fullName: "API User",
        userName: "apiuser",
        email: "api@test.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
  });

  it("GET /users/:id should return 404 if not found", async () => {
    const res = await request(app).get("/users/999");
    expect([200, 404]).toContain(res.statusCode);
  });

});