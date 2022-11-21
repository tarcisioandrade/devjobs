import { Button, ButtonProps, Spinner } from "flowbite-react";
import React, { ReactNode } from "react";

interface Props extends ButtonProps {
  children: ReactNode;
  loading?: boolean | number;
}

const DevButton = (props: Props) => {
  const { loading, children } = props;

  return (
    <Button {...props}>
      {loading ? <Spinner color="warning" /> : children}
    </Button>
  );
};

export default DevButton;
