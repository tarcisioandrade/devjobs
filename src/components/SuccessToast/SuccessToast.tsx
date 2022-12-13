import { CheckIcon } from "@components/svg";
import { Toast } from "flowbite-react";

type Props = {
  message: string;
};

const SuccessToast = ({ message }: Props) => {
  if (!message) return null;
  return (
    <Toast>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <CheckIcon />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <Toast.Toggle />
    </Toast>
  );
};

export default SuccessToast;
