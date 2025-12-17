import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateEvent() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      await api.post("/events", formData);
      alert("Event created successfully");
      navigate("/events");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Create New Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-gray-600 mb-1">Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="Event title"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-600 mb-1">Description</label>
              <textarea
                name="description"
                rows="4"
                required
                placeholder="Event description"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            {/* Date & Time */}
            <div>
              <label className="block text-gray-600 mb-1">Date & Time</label>
              <input
                type="datetime-local"
                name="dateTime"
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-600 mb-1">Location</label>
              <input
                type="text"
                name="location"
                required
                placeholder="Event location"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-gray-600 mb-1">Capacity</label>
              <input
                type="number"
                name="capacity"
                required
                placeholder="Maximum attendees"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-600 mb-1">Event Image</label>
              <input
                type="file"
                name="image"
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateEvent;
