"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
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

const languageOptions = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

export function LanguageDialog() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState("ko"); // 쿠키에서 가져온 현재 언어
  const [selectedLanguage, setSelectedLanguage] = useState("ko"); // 사용자가 선택한 언어

  useEffect(() => {
    // 쿠키에서 현재 언어 불러오기
    // const savedLocale = Cookies.get("NEXT_LOCALE") || "ko";
    // setCurrentLanguage(savedLocale);
    // setSelectedLanguage(savedLocale); // 초기 선택값도 설정
  }, []);

  const handleLanguageChange = () => {
    setCurrentLanguage(selectedLanguage); // 버튼을 눌러야 현재 언어가 변경됨
    // Cookies.set("NEXT_LOCALE", selectedLanguage, { expires: 365 });
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-sm flex items-center gap-2">
          <GlobeIcon />
          {
            languageOptions.find((lang) => lang.value === currentLanguage)
              ?.label
          }
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>언어 설정</DialogTitle>
          <DialogDescription className="sr-only">
            언어 설정 Dialog입니다.
          </DialogDescription>
        </DialogHeader>

        <RadioGroup
          value={selectedLanguage}
          onValueChange={setSelectedLanguage} // 사용자가 선택한 값만 변경 (즉시 반영 X)
        >
          {languageOptions.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={`r-${value}`} />
              <Label htmlFor={`r-${value}`}>{label}</Label>
            </div>
          ))}
        </RadioGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleLanguageChange}>변경</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
