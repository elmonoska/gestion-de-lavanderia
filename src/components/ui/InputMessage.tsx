import type { ReactNode } from "react";

interface InputMessageProps {
  message: ReactNode;
  info?: boolean;
  capitalize?: boolean;
  error?: boolean
}

export default function InputMessage({message, info, capitalize, error}: InputMessageProps) {
  return (
    <>
      <span className={`font-medium text-xs w-full my-1 block
        ${info ? "text-sky-500" : ""}
        ${error ? "text-red-500" : ""}
        ${capitalize ? "capitalize" : ""}`
      }>
        {message}
      </span>
    </>
  )
}
