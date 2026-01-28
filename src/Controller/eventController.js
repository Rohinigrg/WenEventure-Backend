import Event from "../Model/eventModel.js";

/**
 * CREATE EVENT (Admin)
 */
export const createEvent = async (req, res) => {
  try {
const { title, description, date, location, time, slots } = req.body;

const image = req.file ? req.file.path : null;

    if (!title || !description || !date || !location) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      time,
      slots,
      image,
    });

    res.status(201).json({
      data: event,
      message: "Event created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL EVENTS (User Dashboard)
 */
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [["date", "ASC"]],
    });

    res.status(200).json({
      data: events,
      message: "Events fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET EVENT BY ID
 */
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findOne({ where: { id } });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      data: event,
      message: "Event fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE EVENT (Admin)
 */
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findOne({ where: { id } });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.update(req.body);

    res.status(200).json({
      data: event,
      message: "Event updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE EVENT (Admin)
 */
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findOne({ where: { id } });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.destroy();

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
