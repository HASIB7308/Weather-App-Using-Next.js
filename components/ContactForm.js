"use client";

import { useState } from "react";

const fieldClass = "mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-base";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setName(new FormData(form).get("name"));
    setSent(true);
    form.reset();
  }

  if (sent) {
    return (
      <div role="status" className="rounded-xl bg-sea/10 p-6 ring-1 ring-sea/30">
        <p className="text-xl font-bold">Thanks, {name}. Your message is ready.</p>
        <p className="mt-2 text-ink/80">
          This demo form does not send data to a server. Connect it to an API route or an email service to
          receive messages.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-4 rounded-lg bg-ink px-5 py-2 font-semibold text-sky hover:bg-dusk"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="font-medium">Name</label>
        <input id="name" name="name" type="text" required className={fieldClass} />
      </div>
      <div>
        <label htmlFor="email" className="font-medium">Email</label>
        <input id="email" name="email" type="email" required className={fieldClass} />
      </div>
      <div>
        <label htmlFor="message" className="font-medium">Message</label>
        <textarea id="message" name="message" rows={5} required className={fieldClass} />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-ink px-6 py-3 font-semibold text-sky transition-colors hover:bg-dusk sm:w-auto"
      >
        Send message
      </button>
    </form>
  );
}
