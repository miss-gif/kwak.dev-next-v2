"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GlobeIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";

// 언어 코드 타입
type LanguageCode = "ko" | "en" | "ja";

// 라벨 정의
const LANGUAGE_OPTIONS: { value: LanguageCode; labelKey: string }[] = [
  { value: "ko", labelKey: "language.korean" },
  { value: "en", labelKey: "language.english" },
  { value: "ja", labelKey: "language.japanese" },
];

export function LanguageDialog() {
  const t = useTranslations("LanguageDialog");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(
    locale as LanguageCode
  );

  const handleLanguageChange = () => {
    if (selectedLanguage === locale) return;

    // 언어 경로 교체
    const newPath = pathname.replace(/^\/(ko|en|ja)/, `/${selectedLanguage}`);

    router.replace(newPath); // UX 부드럽게
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-sm flex items-center gap-2">
          <GlobeIcon />
          {t(`languageName.${locale}`)}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("setting")}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("settingDescription")}
          </DialogDescription>
        </DialogHeader>

        <RadioGroup
          value={selectedLanguage}
          onValueChange={(value: LanguageCode) => setSelectedLanguage(value)}
        >
          {LANGUAGE_OPTIONS.map(({ value, labelKey }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={`lang-${value}`} />
              <Label htmlFor={`lang-${value}`}>
                {t(`languageName.${value}`)}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleLanguageChange}>{t("change")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
