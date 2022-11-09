import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Badge = ({ children }: Props) => {
  return (
    <span className="text-blueLock text-xs font-medium p-2 border rounded border-current">
      {children}
    </span>
  );
};

export default Badge;
