import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Contact | True Nord",
  description: "Get in touch with True Nord — contact details, location, and a message form.",
};

export default function ContactPage() {
  return <ComingSoon title="Contact" />;
}
