"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { setCookie } from "cookies-next/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

import { signIn } from "next-auth/react";
import { Checkbox } from "../ui/checkbox";

// Improved schema with additional validation rules
const formSchema = z.object({
  username: z
    .string()
    .min(6, { message: "User Id must be at least 6 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
  remember: z.boolean(),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCookie("remember", values.remember);
    try {
      // Assuming an async login function
      console.log(values);
      signIn("credentials", {
        callbackUrl: "/profile",
        username: values.username,
        password: values.password,
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid gap-x-2 gap-y-0 grid-cols-3 h-14">
                  <div className="flex justify-end items-start pt-3">
                    <FormLabel htmlFor="username">User ID*</FormLabel>
                  </div>
                  <FormControl className="col-span-2">
                    <Input
                      id="username"
                      placeholder="johndoe"
                      type="text"
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-2 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-x-2 gap-y-0 grid-cols-3 h-14">
                  <div className="flex justify-end items-start pt-3">
                    <FormLabel htmlFor="password">Password*</FormLabel>
                  </div>
                  <div className="col-span-2">
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="******"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="col-span-2 col-start-2" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="grid gap-2 grid-cols-3">
                <div className="col-span-2 flex flex-row gap-x-2 col-start-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Keep me logged in</FormLabel>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 ">
            <Button
              variant="secondary"
              type="submit"
              className="col-span-1 col-start-2"
            >
              LOGIN
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm w-full">
        No account?{" "}
        <Link href="/register" className="underline">
          Register here
        </Link>
      </div>
    </>
  );
}
