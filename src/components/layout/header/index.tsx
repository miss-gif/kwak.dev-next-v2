"use client";

import HeaderBottom from "@/components/layout/header/header-bottom";
import HeaderTop from "@/components/layout/header/header-top";
import React, { useRef } from "react";

const HeaderContainer = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div className="sticky top-0 left-0 z-10 w-full bg-white dark:bg-black">
      <HeaderTop inputRef={inputRef} />
      <HeaderBottom focusInput={handleFocus} />
    </div>
  );
};

export default HeaderContainer;
