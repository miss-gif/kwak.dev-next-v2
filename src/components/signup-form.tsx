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
import { signInWithGoogle, signInWithKakao } from "@/utils/supabase/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email({
      message: "유효한 이메일을 입력해주세요.",
    }),
    password: z.string().min(6, {
      message: "비밀번호는 최소 6자 이상이어야 합니다.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const t2 = useTranslations("HeaderTop2");
  const t4 = useTranslations("HeaderTop4");
  const b1 = useTranslations("kakaoButton");
  const b2 = useTranslations("googleButton");
  const keys2 = ["element2"] as const;
  const keys3 = ["element3"] as const;
  const keys4 = ["element1", "element2"] as const;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      toast.success("회원가입 성공!", {
        description: "이메일 인증을 완료해주세요.",
      });

      console.log("회원가입 성공", values);

      router.push("/auth/signup");
    } catch (error) {
      toast.error("회원가입 실패", {
        description: "다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      toast.success("구글 로그인 성공!", {
        description: "메인 페이지로 이동합니다.",
      });

      alert("구글 로그인 성공");
      console.log("구글 로그인 성공");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("구글 로그인 실패", {
        description: "Google 로그인 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithKakao();
      toast.success("카카오 로그인 성공!", {
        description: "메인 페이지로 이동합니다.",
      });

      alert("카카오 로그인 성공");
      console.log("카카오 로그인 성공");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("카카오 로그인 실패", {
        description: "Google 로그인 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* 헤더 */}
      <div className="pb-10 space-y-2">
        <div className="text-center text-5xl font-semibold">Kwak.dev</div>
        <div className="text-center text-xs text-gray-500">
          회원가입하고 더 많은 기능을 이용하세요.
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">{t4("passwordCheck")}</FormLabel>
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
          {isLoading ? (
            <Button type="submit" className="w-full py-5" disabled={isLoading}>
              로딩중
            </Button>
          ) : (
            <Button className="w-full py-5 mt-2">{t4("signup")}</Button>
          )}
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
          <span className="mx-4 text-xs">{t4("easySignup")}</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        <div className="text-center">
          <div className="flex flex-col space-y-3 w-full">
            <Button
              variant={"outline"}
              onClick={handleKakaoLogin}
              disabled={isLoading}
            >
              {b1("signup")}
            </Button>
            <Button
              variant={"outline"}
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {b2("signup")}
            </Button>
          </div>
        </div>
      </div>

      {/* 이미 계정이 있으신가요 */}
      <div className="text-center text-sm mt-4">
        {t4("yesUser")}
        <span className="ml-1 font-medium">
          {keys3.map((key) => (
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

export default SignupForm;
