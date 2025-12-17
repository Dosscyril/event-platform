import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          {/* Badge */}
          <span className="inline-block mb-6 px-5 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Eventify
          </span>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Create Events.
            <br />
            <span className="text-blue-600">Build Communities.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
            A modern platform to create, manage and RSVP to events with secure
            authentication, real-time capacity handling and seamless user
            experience.
          </p>

          {/* CTA */}
          <div className="flex justify-center gap-4 mb-16">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/events"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition"
            >
              Explore Events
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <Feature
              title="Create Events Easily"
              desc="Create and manage events with image uploads, capacity limits, and full control."
            />
            <Feature
              title="Secure RSVP System"
              desc="Concurrency-safe RSVP handling ensures no overbooking even with high traffic."
            />
            <Feature
              title="Personalized Dashboard"
              desc="Track events you created and joined in a clean, user-friendly interface."
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* Feature Card Component */
function Feature({ title, desc }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

export default Home;
