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
        <Header />
      </UserProvider>
      <main className="max-w-screen-lg mx-auto my-10 w-full h-full">
        <Component {...pageProps} />
      </main>
      {/* <DevFooter /> */}
    </div>
  );
}

export default MyApp;
