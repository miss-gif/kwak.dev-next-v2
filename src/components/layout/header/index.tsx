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
    <>
      <HeaderTop inputRef={inputRef} />
      <HeaderBottom focusInput={handleFocus} />
    </>
  );
};

export default HeaderContainer;
