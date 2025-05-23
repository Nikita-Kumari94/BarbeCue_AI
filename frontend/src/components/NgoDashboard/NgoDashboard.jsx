import React, { useState } from "react";
import bg2 from '../../assets/bg2.jpg';

function NgoDashboard() {
  const [request, setRequest] = useState({ foodType: "", quantity: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send request to backend
    setMessage("Request submitted successfully!");
    setRequest({ foodType: "", quantity: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-cover bg-right"
        style={{ backgroundImage: `url(${bg2})` }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-900 mb-8 text-center">Food Request Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
                <p className="pb-6 font-mono">🤝 Need Support?</p>
                <div className="text-sm flex flex-col gap-3 font-sans mb-5">
                <p>We’re here for you.</p>
                <p>If you're running low on food supplies or preparing for an upcoming meal distribution, don’t hesitate to send a request.</p>

                <p>🌱 Every request is a step toward feeding more lives with care and dignity.</p>
                <p>Your work matters — and we’re honored to support it.</p>

                <p>Click below to request food from our network of generous partner restaurants. 🍛💛</p></div>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-800 text-white py-2 rounded-md hover:bg-yellow-700"
          >
            Submit Request
          </button>
          {message && <p className="text-green-600 mt-2 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default NgoDashboard;