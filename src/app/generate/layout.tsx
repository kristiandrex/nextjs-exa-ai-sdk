"use client";

import { ChatProvider } from "@/contexts/ChatContext";

export default function GenerateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ChatProvider>{children}</ChatProvider>;
}
