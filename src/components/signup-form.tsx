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
  const t1 = useTranslations("HeaderTop4");
  const t3 = useTranslations("HeaderTop2");
  const t4 = useTranslations("HeaderTop3");
  const keys1 = ["element3"] as const;
  const keys2 = ["element2"] as const;
  const keys3 = ["element1", "element2"] as const;

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
                <FormLabel className="text-xs">{t1("email")}</FormLabel>
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
                <FormLabel className="text-xs">{t1("password")}</FormLabel>
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
                <FormLabel className="text-xs">{t1("passwordCheck")}</FormLabel>
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
            <Button className="w-full py-5 mt-2">{t1("signup")}</Button>
          )}
        </form>
      </Form>

      {/* 아이디 비밀번호 잊으셨나요 */}
      <div className="flex justify-center space-x-2 text-xs text-gray-400 mt-4">
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

      {/* 간편 회원가입 */}
      <div>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-4 text-xs">{t1("easySignup")}</span>
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
                  <span>{t4(`${key}.sigup`)}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 이미 계정이 있으신가요 */}
      <div className="text-center text-sm mt-4">
        {t1("yesUser")}
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

export default SignupForm;
