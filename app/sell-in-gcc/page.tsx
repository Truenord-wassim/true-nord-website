import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Sell in the GCC | True Nord",
  description:
    "Canadian grocery brands: tell True Nord about your products and reach GCC and MENA retailers with zero export complexity.",
};

export default function SellInGccPage() {
  return <ComingSoon title="Sell in the GCC" />;
}
