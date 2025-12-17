import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      alert("You can delete only events you created");
    }
  };

  const handleRSVP = async (event) => {
    try {
      const isJoined = event.attendees.includes(user?.id);

      if (isJoined) {
        await api.post(`/rsvp/${event._id}/leave`);
      } else {
        await api.post(`/rsvp/${event._id}/join`);
      }

      fetchEvents(); // refresh dashboard
    } catch (err) {
      alert(err.response?.data?.message || "RSVP failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Upcoming Events</h1>

            <button
              onClick={() => navigate("/events/new")}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            >
              + Create Event
            </button>
          </div>

          {/* Empty state */}
          {events.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-xl">No events yet 😕</p>
              <p>Create the first one!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => {
                const isJoined = event.attendees.includes(user?.id);
                const isFull = event.attendees.length >= event.capacity;

                return (
                  <div
                    key={event._id}
                    className="bg-white rounded shadow hover:shadow-lg transition flex flex-col"
                  >
                    {/* Image */}
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-44 w-full object-cover rounded-t"
                    />

                    {/* Content */}
                    <div className="p-4 flex-1">
                      <h2 className="font-semibold text-lg mb-1">
                        {event.title}
                      </h2>

                      <p className="text-sm text-gray-600 mb-2">
                        {event.description}
                      </p>

                      <p className="text-sm text-gray-500">
                        📍 {event.location}
                      </p>

                      <p className="text-sm text-gray-500">
                        🕒 {new Date(event.dateTime).toLocaleString()}
                      </p>

                      <p className="text-sm mt-2 font-medium">
                        {event.attendees.length} / {event.capacity} joined
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="p-4 border-t space-y-2">
                      <button
                        onClick={() => handleRSVP(event)}
                        disabled={!isJoined && isFull}
                        className={`w-full py-2 rounded text-white transition ${
                          isJoined
                            ? "bg-gray-500 hover:bg-gray-600"
                            : isFull
                            ? "bg-red-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {isJoined ? "Leave" : isFull ? "Full" : "Join"}
                      </button>

                      {/* Delete only if creator */}
                      {event.createdBy?._id === user?.id && (
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="w-full bg-red-500 text-white py-2 rounded"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Events;
