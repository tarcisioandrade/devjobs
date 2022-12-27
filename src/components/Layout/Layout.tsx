import Header from "@components/Header";
import { ReactNode } from "react";
import { User } from "src/types/User";

type Props = {
  children: ReactNode;
  user: User | null;
};

const Layout = ({ children, user }: Props) => {
  return (
    <>
      <Header user={user}/>
      {children}
    </>
  );
};

export default Layout;
