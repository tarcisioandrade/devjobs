import DevFooter from "@components/DevFooter";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";

import "../styles/globals.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#97BEFE"
        startPosition={0.2}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps} />
      <Toaster />
      {/* <DevFooter /> */}
    </>
  );
}

export default MyApp;
