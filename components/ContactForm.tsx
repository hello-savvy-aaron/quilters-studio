"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: 15 }}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="field">
        <label htmlFor="cname">Name</label>
        <input className="input" id="cname" type="text" placeholder="Your name" />
      </div>
      <div className="field">
        <label htmlFor="cmail">Email</label>
        <input className="input" id="cmail" type="email" placeholder="you@example.com" />
      </div>
      <div className="field">
        <label htmlFor="cnote">What&apos;s on your mind?</label>
        <input className="input" id="cnote" type="text" placeholder="A commission, a question, a design" />
      </div>
      <button className="btn btn-primary btn-block" type="submit">
        {sent ? "Sent — thank you!" : "Send"}
      </button>
    </form>
  );
}
