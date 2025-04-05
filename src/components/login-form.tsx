import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import Link from "next/link";

const LoginForm = () => {
  const t1 = useTranslations("HeaderTop4");
  const t3 = useTranslations("HeaderTop2");
  const t4 = useTranslations("HeaderTop3");
  const keys1 = ["element1"] as const;
  const keys2 = ["element2"] as const;
  const keys3 = ["element1", "element2"] as const;

  return (
    <div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder={t1("email")}
            className="bg-gray-50 border border-gray-200 h-10 text-sm"
          />
          <Label className="text-xs">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder={t1("password")}
            className="bg-gray-50 border border-gray-200 h-10 text-sm"
          />
        </div>

        <Button className="w-full py-5">{t1("login")}</Button>

        <div className="flex justify-center space-x-2 text-xs text-gray-400">
          {keys2.map((key) => (
            <Link
              key={t3(`${key}.label`)}
              href={t3(`${key}.href`)}
              className="hover:underline"
            >
              {t3(`${key}.title`)}
            </Link>
          ))}
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-4 text-sm text-gray-400">{t1("easyLogin")}</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        <div className="text-center">
          <div className="flex flex-col space-y-3 w-full">
            {keys3.map((key) => (
              <Button
                key={t4(`${key}.label`)}
                variant="outline"
                className="flex items-center justify-center py-2 rounded-md w-full"
                asChild
              >
                <Link href={t4(`${key}.href`)}>
                  <span>{t4(`${key}.title`)}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-4">
        계정이 없으신가요?
        <span className="ml-1 font-medium">
          {keys1.map((key) => (
            <Link
              key={t3(`${key}.label`)}
              href={t3(`${key}.href`)}
              className="font-semibold hover:underline text-xs"
            >
              {t3(`${key}.title`)}
            </Link>
          ))}
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
