import Header from "@components/Header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
