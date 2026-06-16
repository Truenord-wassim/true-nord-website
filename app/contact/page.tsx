import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | True Nord",
  description:
    "Get in touch with True Nord — contact details, location, and a message form.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">Get in Touch</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="text-lg font-medium text-white/90">
          Whether you&apos;re a Canadian supplier or a GCC retailer, we&apos;d
          love to hear from you.
        </p>
      </section>

      {/* Two-column content */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-12 md:flex-row">

            {/* Left column: contact form */}
            <div className="flex-[3]">
              <h2 className="mb-6 font-heading text-2xl font-semibold text-navy">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Right column: contact details */}
            <div className="flex-[2]">
              <h2 className="mb-6 font-heading text-2xl font-semibold text-navy">
                Contact details
              </h2>
              <ul className="space-y-6">

                {/* Email */}
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                    Email
                  </p>
                  <div className="mt-0.5 space-y-0.5">
                    <a
                      href="mailto:info@true-nord.ca"
                      className="block text-red underline hover:text-red-shade"
                    >
                      info@true-nord.ca
                    </a>
                    <a
                      href="mailto:fouad@true-nord.ca"
                      className="block text-red underline hover:text-red-shade"
                    >
                      fouad@true-nord.ca
                    </a>
                  </div>
                </li>

                {/* Phone */}
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                    Phone
                  </p>
                  <a
                    href="tel:+16475220891"
                    className="mt-0.5 block text-red underline hover:text-red-shade"
                  >
                    +1 647 522 0891
                  </a>
                </li>

                {/* Address */}
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                    Address
                  </p>
                  <address className="mt-0.5 not-italic text-navy">
                    Unit C18, 724 Caledonia Rd
                    <br />
                    North York, ON, Canada
                    <br />
                    M6B 3X7
                  </address>
                </li>

                {/* LinkedIn — placeholder link, replace href="#" with real URL once available */}
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                    LinkedIn
                  </p>
                  {/* TODO: replace href="#" with the True Nord LinkedIn company page URL once available */}
                  <a
                    href="#"
                    className="mt-0.5 block text-red underline hover:text-red-shade"
                  >
                    true-nord
                  </a>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
