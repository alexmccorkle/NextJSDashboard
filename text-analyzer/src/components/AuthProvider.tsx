"use client";

import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// In simple terms: This is a component that wraps the children components with the
// SessionProvider component from next-auth/react.
