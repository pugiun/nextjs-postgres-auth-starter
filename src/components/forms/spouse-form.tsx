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
import { useEffect } from "react";
import { Loader } from "lucide-react";

const formSchema = z.object({
  spouse_salutation: z.string(),
  spouse_firstname: z.string().min(1),
  spouse_lastname: z.string().min(1),
});

interface Props {
  update(
    spouse_salutation: string,
    spouse_firstname: string,
    spouse_lastname: string
  ): void;
  profile: ProfileObject;
}

export default function SpouseForm(props: Props) {
  const { update, profile } = props;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      update(
        values.spouse_salutation,
        values.spouse_firstname,
        values.spouse_lastname
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  useEffect(() => {
    if (profile) {
      form.setValue("spouse_salutation", profile.spouse_salutation || "");
      form.setValue("spouse_firstname", profile.spouse_firstname || "");
      form.setValue("spouse_lastname", profile.spouse_lastname || "");
    }
  }, [profile]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2  ">
        <FormField
          control={form.control}
          name="spouse_salutation"
          render={({ field }) => (
            <FormItem className="gap-1 h-20">
              <FormLabel>Spouse salutation*</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={profile.spouse_salutation || ""}
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
          name="spouse_firstname"
          render={({ field }) => (
            <FormItem className="gap-1 h-20">
              <FormLabel>Spouse first name*</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
                  {...field}
                  defaultValue={profile.spouse_firstname || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="spouse_lastname"
          render={({ field }) => (
            <FormItem className="gap-1 h-20">
              <FormLabel>Spouse last name*</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
                  {...field}
                  defaultValue={profile.spouse_lastname || ""}
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
            variant="secondary"
            disabled={form.formState.isSubmitting}
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
