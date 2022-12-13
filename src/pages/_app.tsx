import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserProvider from "@contexts/UserContext";
import DevFooter from "@components/DevFooter";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <SessionProvider session={pageProps.session}>
        <UserProvider>
          <Component {...pageProps} />
          <Toaster />
        </UserProvider>
        {/* <DevFooter /> */}
      </SessionProvider>
    </div>
  );
}

export default MyApp;
