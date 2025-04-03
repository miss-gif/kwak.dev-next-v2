import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export function LoginDialog() {
  const links = [
    { href: "/signin/find/password", label: "비밀번호 찾기" },
    { href: "/signup", label: "회원가입" },
    { href: "/signin/find/id", label: "아이디(이메일) 찾기" },
  ];

  const socialLogin = [
    {
      name: "Kakao",
      href: "/",
      icon: <span>K</span>, // Replace with actual icon
    },
    {
      name: "Naver",
      href: "/",
      icon: <span>N</span>, // Replace with actual icon
    },
    {
      name: "Google",
      href: "/",
      icon: <span>G</span>, // Replace with actual icon
    },
    {
      name: "Github",
      href: "/",
      icon: <GithubIcon />,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="text-sm">
          로그인
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="sr-only">
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>로그인 Dialog 입니다.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="text-center text-4xl font-semibold pt-5 pb-8">
            Kwak.dev
          </div>
          <Input type="email" placeholder="이메일" />
          <Input type="password" placeholder="비밀번호" />
          <DialogClose asChild>
            <Button className="w-full">로그인</Button>
          </DialogClose>

          <ul className="flex gap-4 justify-center text-xs">
            {links.map((item) => (
              <li
                key={item.href}
                className="border-b pb-0.5 border-b-black hover:font-semibold"
              >
                <DialogClose asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DialogClose>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center gap-2 py-2">
          <span></span>
          <p className="text-xs">간편 로그인</p>
          <span></span>
        </div>

        <div className="flex justify-center gap-2">
          {socialLogin.map((item) => (
            <Link key={item.name} href={item.href}>
              <DialogClose asChild>
                <Button variant="ghost" className="w-10 h-10 rounded-full">
                  {item.icon}
                </Button>
              </DialogClose>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
