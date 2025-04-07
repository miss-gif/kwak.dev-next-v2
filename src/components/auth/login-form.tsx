"use client";

import { AuthHeader } from "@/components/auth/auth-header";
import { CustomFormField } from "@/components/auth/form-field";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link } from "@/i18n/navigation";
import { handleOAuthLogin } from "@/utils/auth/oauth-login";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "이메일을 확인해주세요." }),
  password: z.string().min(6, { message: "비밀번호를 확인해주세요." }),
});

const LoginForm = () => {
  const t2 = useTranslations("HeaderTop2");
  const t4 = useTranslations("HeaderTop4");
  const keys1 = ["element1"] as const;
  const keys2 = ["element2"] as const;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "name@example.com", password: "name@example.com" },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const supabase = await createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        setMessage(`로그인 실패: ${error.message}`);
        toast.error("로그인 실패", {
          description: "이메일과 비밀번호를 확인해주세요.",
        });
      } else {
        toast.success("로그인 성공!", {
          description: "메인 페이지로 이동합니다.",
        });
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("로그인 실패", {
        description: "알 수 없는 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <AuthHeader
        title="Kwak.dev"
        description="계정에 로그인하고 더 많은 기능을 이용해보세요."
      />

      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <CustomFormField
            control={form.control}
            name="email"
            label={t4("email")}
            placeholder="name@example.com"
          />
          <CustomFormField
            control={form.control}
            name="password"
            label={t4("password")}
            type="password"
          />
          <Button
            type="submit"
            className="w-full py-5 mt-2"
            disabled={isLoading}
          >
            {isLoading ? "로딩중" : t4("login")}
          </Button>
        </form>
      </Form>

      {/* 아이디 비밀번호 잊으셨나요 */}
      <div className="flex justify-center space-x-2 text-xs text-gray-400 mt-4">
        {keys2.map((key) => (
          <Link
            key={t2(`${key}.label`)}
            href={t2(`${key}.href`)}
            className="hover:underline"
          >
            {t2(`${key}.title`)}
          </Link>
        ))}
      </div>

      {/* 간편 회원가입 */}
      <div>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-4 text-sm text-gray-400">{t4("easyLogin")}</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>
        <SocialLoginButtons
          isLoading={isLoading}
          handleOAuthLogin={(provider) =>
            handleOAuthLogin(provider, setIsLoading)
          }
        />
      </div>

      {/* 이미 계정이 있으신가요 */}
      <div className="text-center text-sm mt-4">
        {t4("noUser")}
        <span className="ml-1 font-medium">
          {keys1.map((key) => (
            <Link
              key={t2(`${key}.label`)}
              href={t2(`${key}.href`)}
              className="font-semibold hover:underline text-xs"
            >
              {t2(`${key}.title`)}
            </Link>
          ))}
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
