"use server";

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; errors: Partial<Record<"name" | "email" | "message", string>>; values: Record<string, string> }
  | { status: "failed"; values: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a message from the Contact page.
 *
 * Delivery is NOT connected yet: until the owner picks where messages should go
 * (an inbox via an email service, or a form service), `deliver` returns false and the
 * visitor sees an honest "couldn't send" message instead of a fake success.
 */
export async function sendContactMessage(_prev: ContactState, form: FormData): Promise<ContactState> {
  const values = {
    name: String(form.get("name") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    message: String(form.get("message") ?? "").trim(),
  };

  // Honeypot: people never see this field, so anything in it came from a bot.
  // Pretend it worked so the bot moves on.
  if (String(form.get("company") ?? "") !== "") return { status: "sent" };

  const errors: Partial<Record<"name" | "email" | "message", string>> = {};
  if (!values.name) errors.name = "Please tell me your name.";
  if (!values.email) errors.email = "Please add your email so I can write back.";
  else if (!EMAIL.test(values.email)) errors.email = "That email address doesn’t look quite right.";
  if (!values.message) errors.message = "Please write a message.";
  else if (values.message.length > 5000) errors.message = "Please keep it under 5,000 characters.";
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  const ok = await deliver(values);
  return ok ? { status: "sent" } : { status: "failed", values };
}

async function deliver(msg: { name: string; email: string; message: string }): Promise<boolean> {
  void msg;
  // TODO(owner): choose a destination, then send here. Nothing is stored or forwarded today.
  return false;
}
