"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthForm, AuthSchema } from "@/lib/schemas/auth.schema";
import { CLoginResult } from "@/lib/types/client/client-response";
import { MainRes } from "@/lib/types/api-response";
import { handleFormError } from "@/lib/helpers/client/client-helper";
import { doAlert } from "@/lib/helpers/alert";
import useAuth from "@/lib/stores/auth-store";

const LoginForm = () => {
  const { setSession, user } = useAuth();

  useEffect(() => {
    console.log("🔥 User berubah:", user);
  }, [user]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<AuthForm>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: AuthForm) {
    try {
      setIsLoading(true);

      const doLogin = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const { success, code, message, result }: MainRes<CLoginResult> =
        await doLogin.json();

      if (!success) {
        handleFormError<AuthForm>(code, result, message, form);
        return;
      }
      setSession(result.user);
      doAlert(1, message);
      return;
    } catch {
      doAlert(0, "Terjadi Kesalahan ! Silahkan Hubungi Administrator !");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center text-center gap-1">
          <h1 className="text-lg font-bold">Aplikasi Pendataan Penduduk</h1>
          <p className="text-[10px] sm:text-xs text-muted-foreground text-balance">
            Silahkan Login Untuk Mengakses Aplikasi
          </p>
          <hr className="w-full mt-2" />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="example@mail.com"
                        autoComplete="off"
                        required
                        disabled={isLoading}
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="*******"
                        required
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <hr className="w-full border-t-2 my-3" />
            <div className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <Link href={"/"}>
                  <span className="bg-card text-muted-foreground relative z-10 px-2 text-xs cursor-pointer">
                    Kembali Ke Halaman Utama
                  </span>
                </Link>
              </div>
              <Link href={"/dashboard"}>
                <Button type="button" className="w-full text-xs" size={"sm"}>
                  Dashboard
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
