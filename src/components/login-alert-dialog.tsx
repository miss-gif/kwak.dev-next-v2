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
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { XIcon } from "lucide-react";

export async function LoginAlertDialog() {
  const t1 = await getTranslations("Header-Top-light-login");
  const t2 = await getTranslations("Header-Top-light");

  const t2Arr = [
    { href: "/signup", id: "signUp" },
    { href: "/signin/find-user", id: "findUser" },
  ];

  const socialLogins = [
    { name: "Kakao", href: "/", icon: "Kakao" },
    { name: "Google", href: "/", icon: "Google" },
  ];

  const FooterLinks = () => (
    <ul className="flex items-center justify-between">
      {t2Arr.map((item) => (
        <li key={item.id} className="flex gap-1 py-0">
          <AlertDialogAction asChild className="hover:bg-transparent h-4">
            <Link href={item.href} className="text-xs underline px-1">
              {t2(item.id)}
            </Link>
          </AlertDialogAction>
        </li>
      ))}
    </ul>
  );

  const SocialLoginButtons = () => (
    <div className="grid gap-2">
      {socialLogins.map((item) => (
        <AlertDialogAction asChild key={item.name}>
          <Link href={item.href} className="border">
            {item.icon}
          </Link>
        </AlertDialogAction>
      ))}
    </div>
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="text-sm">
          {t1("login")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="sr-only">
          <AlertDialogTitle>{t1("login")}</AlertDialogTitle>
          <AlertDialogDescription>
            This is a {t1("login")} dialog.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-2">
          <div className="text-center text-4xl font-semibold pt-5 pb-8">
            Kwak.dev
          </div>
          <Input type="email" placeholder={t1("email")} />
          <Input type="password" placeholder={t1("password")} />
          <AlertDialogAction
            asChild
            className="hover:bg-primary/90 hover:text-white"
          >
            <Button className="w-full py-5">{t1("login")}</Button>
          </AlertDialogAction>
          <FooterLinks />
        </div>

        <div className="flex items-center justify-center gap-2 py-2 relative">
          <span className="h-[1px] bg-gray-200 w-full absolute -z-10"></span>
          <p className="text-xs bg-white px-4">{t1("easyLogin")}</p>
        </div>

        <SocialLoginButtons />

        <div className="absolute top-0 right-0 p-2">
          <AlertDialogCancel>
            <XIcon />
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
