import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserProvider from "@contexts/UserContext";
import Header from "@components/Header";
import DevFooter from "@components/DevFooter";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col h-screen">
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
      {/* <DevFooter /> */}
    </div>
  );
}

export default MyApp;
