import Event from "../models/Event.js";

/* JOIN EVENT (ATOMIC) */
export const joinEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.userId;

    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        attendees: { $ne: userId },
        $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] }
      },
      {
        $push: { attendees: userId }
      },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({
        message: "Event full or already joined"
      });
    }

    res.status(200).json({
      message: "Successfully joined event",
      event
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* LEAVE EVENT */
export const leaveEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.userId;

    const event = await Event.findByIdAndUpdate(
      eventId,
      { $pull: { attendees: userId } },
      { new: true }
    );

    res.status(200).json({
      message: "Successfully left event",
      event
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
