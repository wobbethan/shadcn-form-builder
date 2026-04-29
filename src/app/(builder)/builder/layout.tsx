"use client";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";

export default function BuilderThemeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </Suspense>
  );
}
