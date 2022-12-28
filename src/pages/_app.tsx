import DevFooter from "@components/DevFooter";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="">
      <Component {...pageProps} />
      <Toaster />
      {/* <DevFooter /> */}
    </div>
  );
}

export default MyApp;
