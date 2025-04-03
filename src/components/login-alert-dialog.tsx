import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export function LoginAlertDialog() {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="text-sm">
          로그인
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader className="sr-only">
          <AlertDialogTitle>로그인</AlertDialogTitle>
          <AlertDialogDescription>로그인 Dialog 입니다.</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4">
          <div className="text-center text-4xl font-semibold pt-5 pb-8">
            Kwak.dev
          </div>
          <Input type="email" placeholder="이메일" />
          <Input type="password" placeholder="비밀번호" />
          <AlertDialogAction
            asChild
            className="hover:bg-primary/90 hover:text-white"
          >
            <Button className="w-full">로그인</Button>
          </AlertDialogAction>

          <ul className="flex gap-4 justify-center text-xs">
            {links.map((item) => (
              <li key={item.href} className="px-1">
                <AlertDialogAction asChild className="hover:bg-transparent">
                  <Link
                    href={item.href}
                    className="text-xs underline hover:font-semibold"
                  >
                    {item.label}
                  </Link>
                </AlertDialogAction>
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
              <AlertDialogAction asChild>
                <Button variant="ghost" className="w-10 h-10 rounded-full">
                  {item.icon}
                </Button>
              </AlertDialogAction>
            </Link>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>X</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
