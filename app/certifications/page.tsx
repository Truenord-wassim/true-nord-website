import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Certifications | True Nord",
  description:
    "True Nord holds the certifications required for food import into GCC and MENA markets, including Halal and CFIA export certification.",
};

export default function CertificationsPage() {
  return <ComingSoon title="Certifications" />;
}
