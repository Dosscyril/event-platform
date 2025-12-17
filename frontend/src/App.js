import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import ProtectedRoute from "./components/ProtectedRoute";
import MyEvents from "./pages/MyEvents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/new"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
  path="/my-events"
  element={
    <ProtectedRoute>
      <MyEvents />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
