import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // dispatch(login({ email, password }));

    console.log("login called");
  };
  return (
    <div className="App">
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Medical Store Login
          </h2>
          <input
            className="mb-4 w-full border p-2 rounded"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mb-4 w-full border p-2 rounded"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
