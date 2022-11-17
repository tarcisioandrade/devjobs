import React, { forwardRef, InputHTMLAttributes, ForwardedRef } from "react";
import ErrorMessage from "../ErrorMessage";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errors: {};
  label: string;
}

const DevInput = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const { onChange, onBlur, name, errors, label } = props;

    const hasError = errors[name] && errors[name].message != "";

    return (
      <div className="relative">
        <input
          id={`${name}-input`}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent dark:bg-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white ${
            hasError
              ? "dark:border-red-500 dark:focus:border-red-500"
              : "dark:border-gray-600 dark:focus:border-blue-500"
          }  focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          placeholder=" "
          autoComplete="no"
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={`${name}-input`}
          className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 ${
            hasError
              ? "peer-focus:text-red-500 peer-focus:dark:text-red-500 text-red-500 dark:text-red-500"
              : "peer-focus:text-blue-600 peer-focus:dark:text-blue-500 text-gray-500 dark:text-gray-400"
          } peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
        >
          {label}
        </label>
        {hasError ? <ErrorMessage message={errors[name]?.message} /> : null}
      </div>
    );
  }
);

DevInput.displayName = "DevInput";
export default DevInput;
