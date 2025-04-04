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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type LanguageCode = "ko" | "en" | "ja";

type LanguageOption = {
  value: LanguageCode;
  label: string;
};

type LanguageDialogText = {
  setting: string;
  change: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

const LANGUAGE_DIALOG_OPTIONS: Record<LanguageCode, LanguageDialogText> = {
  ko: { setting: "언어 설정", change: "변경" },
  en: { setting: "Language Settings", change: "Change" },
  ja: { setting: "言語 設定", change: "変更" },
};

const DEFAULT_LANGUAGE: LanguageCode = "ko";

export function LanguageDialog() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract language from pathname or use default
  const currentPathLanguage =
    (pathname.split("/")[1] as LanguageCode) || DEFAULT_LANGUAGE;

  const [currentLanguage, setCurrentLanguage] =
    useState<LanguageCode>(currentPathLanguage);
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageCode>(currentPathLanguage);

  // Find the current language label
  const currentLanguageLabel = LANGUAGE_OPTIONS.find(
    (lang) => lang.value === currentLanguage
  )?.label;

  const handleLanguageChange = () => {
    if (currentLanguage === selectedLanguage) return;

    const newPath =
      pathname.replace(/^\/(ko|en|ja)/, `/${selectedLanguage}`) ||
      `/${selectedLanguage}${pathname}`;

    setCurrentLanguage(selectedLanguage);
    router.push(newPath);
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-sm flex items-center gap-2">
          <GlobeIcon />
          {currentLanguageLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {LANGUAGE_DIALOG_OPTIONS[selectedLanguage].setting}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {LANGUAGE_DIALOG_OPTIONS[selectedLanguage].setting} It is an area.
          </DialogDescription>
        </DialogHeader>

        <RadioGroup
          value={selectedLanguage}
          onValueChange={(value: LanguageCode) => setSelectedLanguage(value)}
        >
          {LANGUAGE_OPTIONS.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={`lang-${value}`} />
              <Label htmlFor={`lang-${value}`}>{label}</Label>
            </div>
          ))}
        </RadioGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleLanguageChange}>
              {LANGUAGE_DIALOG_OPTIONS[selectedLanguage].change}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
