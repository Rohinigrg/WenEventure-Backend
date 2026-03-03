import Event from "../../Model/eventModel.js";

describe("Event Model", () => {

  it("should create an event successfully", async () => {
    const event = await Event.create({
      title: "Community Meetup",
      description: "Tech community gathering",
      date: new Date(),
      location: "Kathmandu",
    });

    expect(event.title).toBe("Community Meetup");
    expect(event.location).toBe("Kathmandu");
  });

  it("should not create event without required fields", async () => {
    try {
      await Event.create({});
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

});