import React from "react";

type InnerProps = {
  children: React.ReactNode;
  className?: string;
};

const Inner = ({ children, className }: InnerProps) => {
  return <div className={`container mx-auto p-2 ${className}`}>{children}</div>;
};

export default Inner;
