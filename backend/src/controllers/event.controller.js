import Event from "../models/Event.js";

/* CREATE EVENT */
export const createEvent = async (req, res) => {
  try {
    const { title, description, dateTime, location, capacity } = req.body;

    if (!title || !description || !dateTime || !location || !capacity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Event image is required" });
    }

    const event = await Event.create({
      title,
      description,
      dateTime,
      location,
      capacity,
      image: req.file.path,
      createdBy: req.user.userId,
      attendees: []
    });

    res.status(201).json({
      message: "Event created successfully",
      event
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* GET ALL EVENTS */
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email")
      .sort({ dateTime: 1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* UPDATE EVENT */
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* DELETE EVENT */
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await event.deleteOne();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
