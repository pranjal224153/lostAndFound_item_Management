import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);

      // token save
      localStorage.setItem("token", res.data.token);

      alert("Login Successful!");
      nav("/dashboard");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account?</p>
      <Link to="/register">Register Here</Link>
    </div>
  );
}