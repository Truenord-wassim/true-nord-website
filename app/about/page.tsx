import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "About Us | True Nord",
  description:
    "Learn about True Nord, a Canadian grocery trading company with 15+ years of MENA market experience connecting Canadian brands with GCC and MENA retailers.",
};

export default function AboutPage() {
  return <ComingSoon title="About Us" />;
}
