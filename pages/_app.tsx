import AuthContextProvider from "@/store/AuthContext";
import VocabContextProvider from "@/store/VocabContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <VocabContextProvider>
          <Component {...pageProps} />
        </VocabContextProvider>
      </AuthContextProvider>
    </SessionProvider>
  );
}
