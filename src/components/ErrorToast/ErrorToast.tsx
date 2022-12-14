import { Toast } from "flowbite-react";

type Props = {
  message: string;
};

const ErrorToast = ({ message }: Props) => {
  if (!message) return null;
  return (
    <Toast className="fixed top-4 ">
      <div className="inline-flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-lg shrink-0 dark:bg-red-800 dark:text-blue-200">
        !
      </div>
      <div className="ml-3 text-sm font-normal" data-testid="ErrorToast-message">{message}</div>
      <Toast.Toggle />
    </Toast>
  );
};

export default ErrorToast;
