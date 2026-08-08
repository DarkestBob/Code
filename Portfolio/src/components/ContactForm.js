"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate sending
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in-up delay-200 space-y-5" id="contact-form">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="contact-name" className="block text-sm font-medium text-heading">
          Name
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-heading placeholder-text-light outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/10"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="contact-email" className="block text-sm font-medium text-heading">
          Email
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-heading placeholder-text-light outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/10"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="contact-message" className="block text-sm font-medium text-heading">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell me about your project..."
          className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm text-heading placeholder-text-light outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/10"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className={`group inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold shadow-lg transition-all duration-300 sm:w-auto ${
          status === "sent"
            ? "bg-accent text-white shadow-accent/25"
            : status === "sending"
            ? "bg-accent/70 text-white shadow-accent/15 cursor-wait"
            : "bg-accent text-white shadow-accent/25 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
        }`}
        id="contact-submit"
      >
        {status === "sending" ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : status === "sent" ? (
          <>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Message Sent!
          </>
        ) : (
          <>
            Send Message
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
