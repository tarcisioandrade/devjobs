import { Button, ButtonProps, Spinner } from "flowbite-react";
import React, { ReactNode } from "react";

interface Props extends ButtonProps {
  children: ReactNode;
  loading?: boolean | number;
}

const DevButton = (props: Props) => {
  const { loading, children } = props;

  return (
    <Button style={{ width: "100%", height: "48px" }} {...props}>
      {loading ? <Spinner /> : children}
    </Button>
  );
};

export default DevButton;
