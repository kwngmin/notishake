"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface BasicButtonProps {
  name: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "negative";
  fullWidth?: boolean;
  roundEdges?: boolean;
}

const Button = ({
  name,
  variant,
  fullWidth = true,
  roundEdges = false,
  ...rest
}: BasicButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();

  const defaultStyle = `my-4 flex h-12 cursor-pointer items-center justify-center select-none font-medium active:scale-98 text-base px-6 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`;

  const width = fullWidth ? "w-full" : "";
  const edges = roundEdges ? "rounded-full" : "rounded";

  const getButtonType = () => {
    const primary = "bg-indigo-500 hover:bg-indigo-600 text-white";
    const secondary = "bg-neutral-200/60 hover:bg-neutral-200 text-neutral-500";
    const outline = "text-neutral-600 ring-1 ring-neutral-300";
    const ghost = "text-neutral-600";
    const negative = "bg-red-500 hover:bg-red-600/90 text-white";

    switch (variant) {
      case "primary":
        return primary;
      case "secondary":
        return secondary;
      case "outline":
        return outline;
      case "ghost":
        return ghost;
      case "negative":
        return negative;
      default:
        return primary;
    }
  };

  return (
    <button
      className={`${defaultStyle} ${width} ${edges} ${getButtonType()}`}
      {...rest}
    >
      {pending ? "로딩중..." : name}
    </button>
  );
};

export default Button;
