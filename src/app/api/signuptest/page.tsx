"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import React from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/", // redirect after verification
      },
      {
        onRequest: () => {
          console.log("Requesting...");
        },
        onSuccess: () => {
          alert("Sign up success! Check your email for verification.");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );

    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", gap: 10 }}>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (min. 8 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={{ padding: 10, background: "black", color: "white" }}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
