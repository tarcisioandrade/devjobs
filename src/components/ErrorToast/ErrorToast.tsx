import { Toast } from "flowbite-react";

const ErrorToast = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="flex justify-center">
      <Toast className="fixed top-4 ">
        <div className="inline-flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-lg shrink-0 dark:bg-red-800 dark:text-blue-200">
          !
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <Toast.Toggle />
      </Toast>
    </div>
  );
};

export default ErrorToast;
