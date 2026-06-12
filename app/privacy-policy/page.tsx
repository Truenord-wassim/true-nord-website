import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Privacy Policy | True Nord",
  description: "How True Nord collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return <ComingSoon title="Privacy Policy" />;
}
