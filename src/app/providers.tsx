"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

export const IsMarriedContext = createContext<{
  isMarried: boolean;
  setIsMarried: (value: boolean) => void;
}>({ isMarried: false, setIsMarried: () => {} });

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function SessionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

export const IsMarriedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMarried, setIsMarried] = useState(false);

  return (
    <IsMarriedContext.Provider value={{ isMarried, setIsMarried }}>
      {children}
    </IsMarriedContext.Provider>
  );
};
