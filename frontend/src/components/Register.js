import React, { useState } from "react";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/register", form);
    alert("Registered!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})}/>
      <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})}/>
      <button>Register</button>
    </form>
  );
}