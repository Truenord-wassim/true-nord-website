import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Regions & Markets | True Nord",
  description:
    "The GCC and MENA regions True Nord serves, and the Canadian grocery brands available to retailers in each market.",
};

export default function RegionsMarketsPage() {
  return <ComingSoon title="Regions & Markets" />;
}
