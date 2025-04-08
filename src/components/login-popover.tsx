import LogoutButton from "@/app/[locale]/auth/components/logout-button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface Props {
  email: string;
  point?: number | null;
  couponCount?: number | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

function LoginPopover({ email, point, couponCount, setIsLoggedIn }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Image
            src="/e-can.png"
            alt="유저 popover 버튼"
            width={30}
            height={30}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 md:w-80 p-3 bg-white border border-gray-200 rounded-md shadow-md z-10">
        <UserProfileSection email={email} />
        <UserFinanceSection
          couponCount={(couponCount = 0)}
          point={(point = 0)}
        />
        <NavigationSection />
        <LogoutButton setIsLoggedIn={setIsLoggedIn} />
      </PopoverContent>
    </Popover>
  );
}

interface UserProfileSectionProps {
  email: string;
}

function UserProfileSection({ email }: UserProfileSectionProps) {
  return (
    <section className="py-1">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          src="/e-can.png"
          alt="유저 아이콘"
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{email}</span>
          <span className="text-xs text-gray-500">일반 회원</span>
        </div>
      </div>
    </section>
  );
}

interface UserFinanceSectionProps {
  couponCount: number;
  point: number;
}

function UserFinanceSection({ couponCount, point }: UserFinanceSectionProps) {
  const item = [
    { label: "쿠폰", value: couponCount, quantity: "개" },
    { label: "포인트", value: point, quantity: "pt" },
  ];

  return (
    <section className="grid grid-cols-2 gap-1 text-sm py-2">
      {item.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between bg-gray-200 rounded-xs p-2 text-xs"
        >
          <div className="font-semibold">{item.label}</div>
          <div>
            <span className="font-semibold text-green-500 px-1">
              {item.value}
            </span>
            {item.quantity}
          </div>
        </div>
      ))}
    </section>
  );
}

function NavigationSection() {
  const navigationLinks = [
    { href: "/", label: "마이페이지" },
    { href: "/", label: "포인트 내역" },
    { href: "/", label: "결제 내역" },
    { href: "/", label: "구매 내역" },
    { href: "/", label: "좋아요" },
    { href: "/", label: "계정 설정" },
  ];

  return (
    <nav className="space-y-1 mb-3">
      {navigationLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="block py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export default LoginPopover;
