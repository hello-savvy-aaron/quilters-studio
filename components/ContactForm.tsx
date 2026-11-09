"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/contact/actions";

const initial: ContactState = { status: "idle" };

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, initial);

  if (state.status === "sent") {
    return (
      <div className="form-note form-note-ok" role="status">
        <p className="opening">Thank you — your message is on its way.</p>
        <p>I’ll write back as soon as I can.</p>
      </div>
    );
  }

  const errors = state.status === "invalid" ? state.errors : {};
  const values = state.status === "invalid" || state.status === "failed" ? state.values : {};

  return (
    <form className="contact-form" action={action} noValidate>
      {state.status === "failed" && (
        <p className="form-note form-note-error" role="alert">
          Sorry — your message couldn’t be sent right now. Please try again later.
        </p>
      )}
      <Field id="c-name" name="name" label="Name" autoComplete="name" error={errors.name} value={values.name} />
      <Field id="c-email" name="email" label="Email" type="email" autoComplete="email" error={errors.email} value={values.email} />
      <Field id="c-msg" name="message" label="Message" multiline error={errors.message} value={values.message} />
      {/* Honeypot for spam bots: hidden from people and from screen readers. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="c-company">Company</label>
        <input id="c-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <button className="cta" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send message"} {!pending && <span aria-hidden="true">→</span>}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  error?: string;
  value?: string;
};

function Field({ id, name, label, type = "text", autoComplete, multiline, error, value }: FieldProps) {
  const describedBy = error ? `${id}-error` : undefined;
  const common = {
    id,
    name,
    className: error ? "input input-invalid" : "input",
    defaultValue: value,
    required: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  };
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {multiline ? <textarea {...common} /> : <input {...common} type={type} autoComplete={autoComplete} />}
      {error && (
        <p id={describedBy} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
