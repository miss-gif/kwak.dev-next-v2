"use client";

import HeaderSearchbar from "@/components/layout/header/header-searchbar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { TextSearch } from "lucide-react";
import { useTranslations } from "next-intl";

const SHEET_SIDES = ["left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export function SheetSide({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const pathname = usePathname();

  const t1 = useTranslations("HeaderBottom1");
  const keys1 = ["element1", "element2"] as const;

  return (
    <div className="grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button asChild variant="ghost" size={"icon"}>
              <TextSearch size={20} />
            </Button>
          </SheetTrigger>

          <SheetContent side={side}>
            <SheetHeader className="sr-only">
              <SheetTitle>사이드바 메뉴</SheetTitle>
              <SheetDescription>사이드바 메뉴입니다.</SheetDescription>
            </SheetHeader>

            <div>
              {/* 내용 */}
              <div className="p-2">
                <HeaderSearchbar inputRef={inputRef} />
              </div>
              <div className="p-2 flex flex-col gap-2">
                {keys1.map((key) => {
                  const isActive = pathname === t1(`${key}.href`);

                  return (
                    <div key={t1(`${key}.label`)} className="">
                      <Link
                        href={t1(`${key}.href`)}
                        className={`text-center text-xs hover:underline  ${
                          isActive ? "font-bold" : "font-normal"
                        }`}
                      >
                        {t1(`${key}.title`)}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">SheetFooter</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
