import type { Metadata } from "next";
import { MessageBarProvider } from "@/components/Sidebar/Sidebar";
export const metadata: Metadata = {
  title: "Chat Bubble Logged User",
  description: "A chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <aside className="min-h-screen shadow-md flex-shrink-0">
        <MessageBarProvider />
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
