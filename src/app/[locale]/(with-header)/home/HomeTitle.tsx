import { Button } from "@/components/ui/button";
// import GitHubIcon from "@mui/icons-material/GitHub";
import { Rss } from "lucide-react";
import React from "react";

interface LinkButtonProps {
  href: string;
  label: string;
  Icon: React.ElementType;
}

const text = {
  subTitle: "Building Ideas into Reality with Code",
  title1: "FRONT-END",
  title2: "WEB DEVELOPER",
  content: [
    "이곳은 제가 실험하고 배우며 성장하는 공간입니다.",
    "새로운 기술을 시도하고, 생각을 코드로 풀어냅니다.",
    "완성된 작업물뿐 아니라 도전과 실수를 기록하고 공유합니다.",
    "보다 나은 개발자로 나아가기 위한 자유로운 여정을 확인해 주세요.",
  ],
};

const LinkButton: React.FC<LinkButtonProps> = ({ href, label, Icon }) => (
  <Button asChild>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center gap-2"
    >
      <Icon />
      {label}
    </a>
  </Button>
);

const HomeTitle: React.FC = () => {
  return (
    <div className="flex flex-col items-center sm:px-6 lg:px-8">
      {/* Title Section */}
      <div className="text-center">
        <p className="font-bold">{text.subTitle}</p>
        <p className="text-6xl font-bold lg:text-5xl">{text.title1}</p>
        <p className="text-6xl font-bold lg:text-5xl">{text.title2}</p>
      </div>

      {/* Content Section */}
      <div className="space-y-4 py-14 text-center">
        {text.content.map((item, index) => (
          <p key={index} className="text-sm leading-6">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default HomeTitle;
