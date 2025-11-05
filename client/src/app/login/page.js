"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice.js";

axios.defaults.withCredentials = true;

const Login = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        { withCredentials: true }
      );

      // ✅ Store user globally in Redux
      dispatch(setUser(data.user));

      setMessage({ type: "success", text: data.message || "Login successful!" });

      // ✅ Redirect
      window.location.href = "/";
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="flex items-center justify-center min-h-[80vh] bg-white px-6">
      <div className="card w-full max-w-md">
        <h2 className="text-3xl font-heading text-center mb-6">
          Welcome back to <span className="text-primary">Settle</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          />

          <button type="submit" disabled={loading} className="btn w-full mt-2">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${message.type === "error" ? "text-red-500" : "text-green-600"
              }`}
          >
            {message.text}
          </p>
        )}

        <p className="text-sm text-muted text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
