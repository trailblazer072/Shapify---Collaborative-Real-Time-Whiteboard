"use client";

import { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
  onClick?: any;
  disabled?:boolean
}

export const Button = ({ children, className, onClick  }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
