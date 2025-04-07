"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { signInWithGoogle, signInWithKakao } from "@/utils/supabase/actions";
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
  const b1 = useTranslations("kakaoButton");
  const b2 = useTranslations("googleButton");
  const keys1 = ["element1"] as const;
  const keys2 = ["element2"] as const;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
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

  const handleOAuthLogin = async (provider: "google" | "kakao") => {
    try {
      setIsLoading(true);
      provider === "google"
        ? await signInWithGoogle()
        : await signInWithKakao();
      toast.success("로그인 성공!", {
        description: "메인 페이지로 이동합니다.",
      });
      router.push("/");
    } catch (error: any) {
      toast.error("로그인 실패", {
        description: `${
          provider === "google" ? "Google" : "Kakao"
        } 로그인 중 오류가 발생했습니다.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="pb-10 space-y-2">
        <h1 className="text-center text-5xl font-semibold">Kwak.dev</h1>
        <p className="text-center text-xs text-gray-500">
          계정에 로그인하고 더 많은 기능을 이용해보세요.
        </p>
      </div>

      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">{t4("email")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    {...field}
                    className="bg-gray-50 border border-gray-200 text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">{t4("password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="bg-gray-50 border border-gray-200 text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
        <div className="text-center">
          <div className="flex flex-col space-y-3 w-full">
            <Button
              variant="outline"
              onClick={() => handleOAuthLogin("kakao")}
              disabled={isLoading}
            >
              {b1("login")}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOAuthLogin("google")}
              disabled={isLoading}
            >
              {b2("login")}
            </Button>
          </div>
        </div>
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
      {message && <div className="text-red-500">{message}</div>}
    </div>
  );
};

export default LoginForm;
