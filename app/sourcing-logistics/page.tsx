import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Sourcing & Logistics | True Nord",
  description:
    "How True Nord sources, prepares, exports, and delivers Canadian grocery products to GCC and MENA retailers.",
};

export default function SourcingLogisticsPage() {
  return <ComingSoon title="Sourcing & Logistics" />;
}
