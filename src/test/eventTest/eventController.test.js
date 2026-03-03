import * as eventController from "../../Controller/eventController.js";
import Event from "../../Model/eventModel.js";
import { jest } from "@jest/globals";

jest.mock("../Model/eventModel.js");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Event Controller", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ CREATE EVENT
  it("should create an event", async () => {
    const req = {
      body: {
        title: "Test Event",
        description: "Description",
        date: new Date(),
        location: "Pokhara"
      },
      file: null
    };

    const res = mockResponse();

    Event.create.mockResolvedValue(req.body);

    await eventController.createEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  // ✅ GET ALL EVENTS
  it("should fetch all events", async () => {
    const req = {};
    const res = mockResponse();

    Event.findAll.mockResolvedValue([{ title: "Event1" }]);

    await eventController.getAllEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  // ✅ EVENT NOT FOUND
  it("should return 404 if event not found", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    Event.findOne.mockResolvedValue(null);

    await eventController.getEventById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

});