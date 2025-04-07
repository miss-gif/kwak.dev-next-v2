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
  point: number;
  couponCount: number;
}

function LoginPopover({ email, point, couponCount }: Props) {
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
        <UserFinanceSection couponCount={couponCount} point={point} />
        <NavigationSection />
        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
}

interface UserProfileSectionProps {
  email: string;
}

function UserProfileSection({ email }: UserProfileSectionProps) {
  return (
    <section className="mb-3 py-2 border-b border-gray-200">
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
  return (
    <section className="flex justify-between text-sm text-gray-600 py-2 border-b border-gray-200 mb-3">
      <div>
        쿠폰 <span className="font-semibold">{couponCount}</span>개
      </div>
      <div>
        포인트 <span className="font-semibold">{point}</span> pt
      </div>
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

function LogoutButton() {
  return (
    <Button className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 transition-colors duration-200">
      로그아웃
    </Button>
  );
}

export default LoginPopover;
