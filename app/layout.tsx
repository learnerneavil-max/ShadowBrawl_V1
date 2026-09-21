import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mimo — Your AI, your world",
  description: "Create, evolve and battle your own AI character."
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}