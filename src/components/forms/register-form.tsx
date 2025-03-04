"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { toast } from "sonner";

// Improved schema with additional validation rules
const formSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: "User Id must be at least 6 characters long" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirm Password is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Your passwords do not match.",
      });
    }
  });

interface Props {
  register(username: string, password: string): void;
}

export default function RegisterForm(props: Props) {
  const { register } = props;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Assuming an async login function
      console.log(values);
      let username = values.username;
      let password = values.password;
      const response = register(username, password);
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
                <FormItem className="grid gap-x-2 gap-y-0  grid-cols-3 h-14">
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grid gap-x-2 gap-y-0 grid-cols-3 h-14">
                  <div className="flex justify-end items-start pt-3">
                    <FormLabel htmlFor="confirmPassword">
                      Confirm <span className="hidden md:inline">password</span>
                      *
                    </FormLabel>
                  </div>
                  <div className="col-span-2">
                    <FormControl>
                      <PasswordInput
                        id="confirmPassword"
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
          <div className="grid grid-cols-3 ">
            <Button
              variant="secondary"
              type="submit"
              className="col-span-1 col-start-2"
            >
              REGISTER
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm w-full">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Login here
        </Link>
      </div>
    </>
  );
}
