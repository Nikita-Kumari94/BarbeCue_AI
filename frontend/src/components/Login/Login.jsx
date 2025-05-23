import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import loginImage from '../../assets/bb6.jpg';
import signupImage from '../../assets/bb5.jpg';
import selImage from '../../assets/bb10.jpeg';

function Login() {
  const [userType, setUserType] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const [signupData, setSignupData] = useState({
    username: '',
    org_name: '',
    license_number: '',
    password: '',
    user_type: userType,
    email: '',
    phone: '',
    registered_at: '',
    location: '',
  });

  const [error, setError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        ...loginData,
        user_type: userType,
      });

      if (res.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userType", userType);
        window.dispatchEvent(new Event("storage"));
        navigate(userType === 'ngo' ? '/ngo-dashboard' : '/restaurant-dashboard');
      } else {
        alert("Invalid login!");
      }
    } catch (error) {
      alert("Login failed.");
      console.error(error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const registeredAtValue = signupData.registered_at || new Date().toISOString();

    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        username: signupData.username,
        org_name: signupData.org_name,
        license_number: signupData.license_number,
        email: signupData.email,
        phone: signupData.phone,
        registered_at: registeredAtValue,
        location: signupData.location,
        password: signupData.password,
        user_type: userType,
      });

      if (res.data.success === true) {
        // navigate("/login");
        setIsSignup(false);
      } else {
        setError(res.data.message || JSON.stringify(res.data) || "Signup error");
      }
    } catch (err) {
      console.error("Signup error:", err.response || err.message || err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Signup error"
      );
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4 bg-cover bg-center" style={{ backgroundImage: `url(${selImage})` }}>
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center space-y-8">
          <h2 className="text-3xl font-bold text-yellow-900">Choose Your Role</h2>
          <p className="text-gray-600">Select the type of user you are to continue</p>
          <div className="grid grid-cols-1 gap-6">
            <button
              onClick={() => setUserType("restaurant")}
              className="group border border-yellow-800 rounded-lg p-5 hover:bg-yellow-800 transition duration-300 hover:text-white"
            >
              <div className="text-xl font-semibold">🍽️ Restaurant</div>
              <div className="text-sm text-gray-600 group-hover:text-white">Manage food donations and distribution</div>
            </button>
            <button
              onClick={() => setUserType("ngo")}
              className="group border border-yellow-800 rounded-lg p-5 hover:bg-yellow-800 transition duration-300 hover:text-white"
            >
              <div className="text-xl font-semibold">🏠 NGO / Orphanage</div>
              <div className="text-sm text-gray-600 group-hover:text-white">Request and receive food support</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="w-full max-w-6xl flex shadow-lg rounded-lg overflow-hidden relative">

        {/* IMAGE SECTION */}
        <div className="w-1/2 relative overflow-hidden">
          <div
            className={`absolute inset-0 bg-cover bg-center transition duration-700 ease-in-out
              ${isSignup ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
            style={{ backgroundImage: `url(${loginImage})` }}
          />
          <div
            className={`absolute inset-0 bg-cover bg-center transition duration-700 ease-in-out
              ${isSignup ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
            style={{ backgroundImage: `url(${signupImage})` }}
          />
        </div>

        {/* FORM SECTION */}
        <div className="w-1/2 overflow-hidden relative">
          <div className={`flex w-[200%] transition-transform duration-700 ease-in-out ${isSignup ? '-translate-x-1/2' : 'translate-x-0'}`}>

            {/* LOGIN FORM */}
            <form id="login-form" className="w-1/2 bg-white p-12 space-y-6" onSubmit={handleLoginSubmit}>
              <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>

              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>

              <button type="submit" className="w-full py-3 bg-yellow-800 text-white font-semibold rounded-md">Login</button>

              <p className="text-sm text-center mt-6">
                Don't have an account?
                <button type="button" onClick={() => setIsSignup(true)} className="ml-1 text-yellow-800 font-medium hover:underline">
                  Sign Up
                </button>
              </p>
              <button type="button" onClick={() => setUserType(null)} className="text-xs text-gray-500 underline mt-2">← Back to role selection</button>
            </form>

            {/* SIGNUP FORM */}
            <form id="signup-form" className="w-1/2 bg-white p-12 space-y-6" onSubmit={handleSignupSubmit}>
              <h2 className="text-3xl font-bold text-center mb-6">Create {userType === 'restaurant' ? 'Restaurant' : 'NGO'} Account</h2>

              <div>
                <label>Username</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md"
                  value={signupData.username}
                  onChange={e => setSignupData({ ...signupData, username: e.target.value })}
                  required
                />
              </div>

              <div>
                <label>{userType === 'restaurant' ? 'Restaurant Name' : 'NGO/Orphanage Name'}</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md"
                  value={signupData.org_name}
                  onChange={(e) => setSignupData({ ...signupData, org_name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label>License Number</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md"
                  value={signupData.license_number}
                  onChange={e => setSignupData({ ...signupData, license_number: e.target.value })}
                  required
                />
              </div>

              <div>
                <label>Email</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-md"
                  value={signupData.email}
                  onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label>Phone</label>
                <input
                  type="tel"
                  className="w-full p-3 border rounded-md"
                  value={signupData.phone}
                  onChange={e => setSignupData({ ...signupData, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <label>Location</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md"
                  value={signupData.location}
                  onChange={e => setSignupData({ ...signupData, location: e.target.value })}
                  required
                />
              </div>

              <div>
                <label>Password</label>
                <input
                  type="password"
                  className="w-full p-3 border rounded-md"
                  value={signupData.password}
                  onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-center">{error}</p>}

              <button type="submit" className="w-full py-3 bg-yellow-800 text-white font-semibold rounded-md">Sign Up</button>

              <p className="text-sm text-center mt-6">
                Already have an account?
                <button type="button" onClick={() => setIsSignup(false)} className="ml-1 text-yellow-800 font-medium hover:underline">
                  Login
                </button>
              </p>
              <button type="button" onClick={() => setUserType(null)} className="text-xs text-gray-500 underline mt-2">← Back to role selection</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
