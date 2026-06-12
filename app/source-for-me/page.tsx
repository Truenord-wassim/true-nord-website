import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Source for Me | True Nord",
  description:
    "Tell True Nord what Canadian grocery products you're looking for, and we'll source it for your market.",
};

export default function SourceForMePage() {
  return <ComingSoon title="Source for Me" />;
}
