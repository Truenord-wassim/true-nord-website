import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Current Brands | True Nord",
  description:
    "Browse the Canadian grocery brands True Nord currently carries for GCC and MENA retailers.",
};

export default function BrandsPage() {
  return <ComingSoon title="Current Brands" />;
}
