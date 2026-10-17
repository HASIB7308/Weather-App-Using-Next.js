import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact | Skyline Weather" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-bold">Contact</h1>
      <p className="mb-8 mt-4 text-lg text-ink/80">
        Found a bug or have an idea for the app? Send a message below.
      </p>
      <ContactForm />
    </div>
  );
}
