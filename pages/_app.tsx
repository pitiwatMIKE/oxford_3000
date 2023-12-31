import ButtonSignOut from "@/components/ButtonSignOut";
import AuthContextProvider from "@/store/AuthContext";
import VocabContextProvider from "@/store/VocabContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Toaster position="top-center" />
      <AuthContextProvider>
        <VocabContextProvider>
          <ButtonSignOut />
          <Component {...pageProps} />
        </VocabContextProvider>
      </AuthContextProvider>
    </SessionProvider>
  );
}
