"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ProfileObject } from "@/types/profile";
import { useContext, useEffect } from "react";
import { Loader } from "lucide-react";
import { IsMarriedContext } from "@/app/providers";

const formSchema = z.object({
  salutation: z.string(),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string(),
});

interface Props {
  update(
    salutation: string,
    firstname: string,
    lastname: string,
    email: string
  ): void;
  profile: ProfileObject;
}

export default function DetailsForm(props: Props) {
  const { update, profile } = props;
  const { setIsMarried } = useContext(IsMarriedContext) ?? {
    setIsMarried: undefined,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      update(
        values.salutation,
        values.firstname,
        values.lastname,
        values.email
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  useEffect(() => {
    if (profile) {
      form.setValue("salutation", profile.salutation || "");
      form.setValue("firstname", profile.firstname || "");
      form.setValue("lastname", profile.lastname || "");
      form.setValue("email", profile.email || "");
      if (setIsMarried) setIsMarried(profile.marital_status === "Married");
    }
  }, [profile]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2  ">
        <FormField
          control={form.control}
          name="salutation"
          render={({ field }) => (
            <FormItem className="gap-1 h-20">
              <FormLabel>Salutation*</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={profile.salutation || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select salutation"
                      className="dark:text-white"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Mr.">Mr.</SelectItem>
                  <SelectItem value="Ms.">Ms.</SelectItem>
                  <SelectItem value="Mrs.">Mrs.</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className="gap-1 h-20">
              <FormLabel>First name*</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
                  {...field}
                  defaultValue={profile.firstname || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem className="gap-1 h-20">
              <FormLabel>Last name*</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
                  {...field}
                  defaultValue={profile.lastname || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="gap-1 h-20">
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="email"
                  {...field}
                  defaultValue={profile.email || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-5 justify-between md:justify-start">
          <Button
            type="submit"
            className="w-[130] md:w-[150]"
            disabled={form.formState.isSubmitting}
            variant="secondary"
          >
            {form.formState.isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              "SAVE & UPDATE"
            )}
          </Button>
          <Button asChild className="w-[130] md:w-[150]">
            <Link href="/profile">CANCEL</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
