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
import Link from "next/link";
import { ProfileObject } from "@/types/profile";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";

const formSchema = z.object({
  hobbies: z.string().optional(),
  sports: z.string().optional(),
  music: z.string().optional(),
  shows: z.string().optional(),
});

interface Props {
  update(hobbies: string, sports: string, music: string, shows: string): void;
  profile: ProfileObject;
}

export default function PreferencesForm(props: Props) {
  const { update, profile } = props;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      update(
        values.hobbies || "",
        values.sports || "",
        values.music || "",
        values.shows || ""
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  useEffect(() => {
    if (profile) {
      form.setValue("hobbies", profile.hobbies || "");
      form.setValue("sports", profile.sports || "");
      form.setValue("music", profile.music || "");
      form.setValue("shows", profile.shows || "");
    }
  }, [profile]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
        <FormField
          control={form.control}
          name="hobbies"
          render={({ field }) => (
            <FormItem className="gap-1 min-h-20">
              <FormLabel>Hobbies and interests</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sports"
          render={({ field }) => (
            <FormItem className="gap-1 min-h-20">
              <FormLabel>Favorite sports(s)</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="music"
          render={({ field }) => (
            <FormItem className="gap-1 min-h-20">
              <FormLabel>Preferred music genre(s)</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shows"
          render={({ field }) => (
            <FormItem className="gap-1 min-h-20">
              <FormLabel>Preferred movie/TV shows(s)</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
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
