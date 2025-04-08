"use client";

import { CustomFormField } from "@/components/auth/form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
  const t4 = useTranslations("HeaderTop4");

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
        toast.success("로그인 성공!");
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
        <Button type="submit" className="w-full py-5 mt-2" disabled={isLoading}>
          {isLoading ? "로딩중" : t4("login")}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
