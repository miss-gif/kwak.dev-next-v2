import Inner from "@/components/layout/Inner";
import { Link } from "@/i18n/navigation";
import React from "react";

const HeaderTop = () => {
  return (
    <header>
      <Inner>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-xl font-bold">
              <Link href={"/"}>Kwak.dev</Link>
            </h1>

            <ul className="flex gap-4">
              {/* {NAV_ITEMS[currentLanguage]?.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))} */}
            </ul>

            <div className="flex-1">
              {/* <Input className="w-full" ref={ref} /> */}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* <LanguageDialog />
            <LoginAlertDialog /> */}
          </div>
        </div>
      </Inner>
    </header>
  );
};

export default HeaderTop;
