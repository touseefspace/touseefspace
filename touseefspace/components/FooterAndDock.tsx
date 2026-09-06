import React from "react";
import { getSocialLinks } from "@/lib/queries";
import { Footer } from "@/components/Footer";

/**
 * A Server Component that fetches cached social links and renders footer elements.
 * Designed to be wrapped in a Suspense boundary at the Root Layout level to support page streaming.
 */
export default async function FooterAndDock() {
  const socialLinks = await getSocialLinks();

  return (
    <Footer socialLinks={socialLinks} />
  );
}
