import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to Mary Anne Henderson about commissions, exhibitions, guilds, or a design you’re stuck on.",
};

export default function Contact() {
  return (
    <>
      <PageHero
        title="Get in touch."
        lede="For commissions, exhibition and guild inquiries, or a design you’re stuck on, write to me. Talking ideas will probably yield inspiration."
      />
      <main className="container page-main">
        {/* The "other ways to reach me" column comes back once there's an email address or phone to show. */}
        <div className="panel panel-form">
          <ContactForm />
        </div>
      </main>
    </>
  );
}
