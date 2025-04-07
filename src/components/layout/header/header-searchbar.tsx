import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

interface HeaderTopProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const HeaderSearchbar = ({ inputRef }: HeaderTopProps) => {
  return (
    <div className="flex-1 relative flex items-center justify-end">
      <Input
        ref={inputRef}
        className="w-full pr-10"
        placeholder="아직 지원하지 않는 기능입니다."
      />
      <SearchIcon
        size={20}
        className="absolute right-3 text-muted-foreground"
      />
    </div>
  );
};

export default HeaderSearchbar;
