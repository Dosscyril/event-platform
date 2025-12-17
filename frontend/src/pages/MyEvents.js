import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function MyEvents() {
  const { user } = useAuth();
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);

  useEffect(() => {
    api.get("/events").then((res) => {
      const allEvents = res.data;

      // Events created by user
      setCreatedEvents(
        allEvents.filter(
          (event) => event.createdBy?._id === user?.id
        )
      );

      // Events user has joined
      setJoinedEvents(
        allEvents.filter((event) =>
          event.attendees.includes(user?.id)
        )
      );
    });
  }, [user]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-bold mb-10">My Events</h1>

          {/* Created Events */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Events I Created
            </h2>

            {createdEvents.length === 0 ? (
              <p className="text-gray-500">
                You haven’t created any events yet.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {createdEvents.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            )}
          </section>

          {/* Joined Events */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Events I Joined
            </h2>

            {joinedEvents.length === 0 ? (
              <p className="text-gray-500">
                You haven’t joined any events yet.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {joinedEvents.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
    </>
  );
}

/* Reusable Event Card */
function EventCard({ event }) {
  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition">
      <img
        src={event.image}
        alt={event.title}
        className="h-44 w-full object-cover rounded-t"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{event.title}</h3>
        <p className="text-sm text-gray-600">{event.location}</p>
        <p className="text-sm mt-2">
          {event.attendees.length} / {event.capacity} joined
        </p>
      </div>
    </div>
  );
}

export default MyEvents;
