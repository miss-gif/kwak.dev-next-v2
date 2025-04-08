"use client";

import { CustomFormField } from "@/components/auth/form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
    password: z
      .string()
      .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const t2 = useTranslations("HeaderTop2");
  const t4 = useTranslations("HeaderTop4");
  const keys3 = ["element3"] as const;

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null); // 메시지 상태 추가

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const auth_callback_url = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;

  const handleSignUp = async (email: string, password: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: auth_callback_url,
      },
    });

    if (error) {
      setMessage(`회원가입 실패: ${error.message}`);
      toast.error("회원가입 실패", {
        description: error.message,
      });
    } else {
      setMessage("회원가입 성공! 이메일 인증을 확인하세요.");
      toast.success("회원가입 성공!", {
        description: "이메일 인증을 완료해주세요.",
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await handleSignUp(values.email, values.password); // handleSignUp 호출
      // router.push("/auth/signup"); // 회원가입 성공 후 리디렉션 제거
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          <CustomFormField
            control={form.control}
            name="confirmPassword"
            label={t4("passwordCheck")}
            type="password"
          />
          <Button
            type="submit"
            className="w-full py-5 mt-2"
            disabled={isLoading}
          >
            {isLoading ? "로딩중" : t4("signup")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
