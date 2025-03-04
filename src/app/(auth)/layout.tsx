import Header from "@/components/Headers/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Bubble Login",
  description: "A chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
