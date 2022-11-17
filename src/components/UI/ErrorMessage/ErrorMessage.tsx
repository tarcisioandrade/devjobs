import React from "react";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p
      id="filled_error_help"
      className="mt-2 text-xs text-red-600 dark:text-red-400"
    >
      {message}
    </p>
  );
};

export default ErrorMessage;
