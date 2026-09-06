"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const LiquidBackground = dynamic(() => import("@/components/LiquidBackground"), {
  ssr: false,
});

export default function LayoutWrapper({ 
  children, 
  footerAndDock 
}: { 
  children: React.ReactNode;
  footerAndDock: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if we are in the admin panel
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Toaster position="top-right" />
      {/* Monochromatic living liquid background */}
      <LiquidBackground />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative z-10 outline-none min-h-screen">
        {children}
      </main>
      {footerAndDock}
    </>
  );
}
