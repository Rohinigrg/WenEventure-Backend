import request from "supertest";
import express from "express";
import eventRoutes from "../../Routes/eventRoutes.js";
const app = express();
app.use(express.json());
app.use("/events", eventRoutes);

describe("Event API Endpoints", () => {

  it("GET /events should return 200", async () => {
    const res = await request(app).get("/events");
    expect(res.statusCode).toBe(200);
  });

  it("POST /events should create event", async () => {
    const res = await request(app)
      .post("/events")
      .send({
        title: "API Test Event",
        description: "Testing route",
        date: new Date(),
        location: "Lalitpur"
      });

    expect(res.statusCode).toBe(201);
  });

});