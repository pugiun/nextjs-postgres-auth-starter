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
import { Textarea } from "@/components/ui/textarea";
import LocationSelector from "@/components/ui/location-input";
import { useContext, useEffect } from "react";
import { Loader } from "lucide-react";
import { format, parse } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IsMarriedContext } from "@/app/providers";

const formSchema = z.object({
  address: z.string(),
  postal_code: z.string().min(1),
  country_code: z.string().min(1),
  gender: z.string().optional(),
  marital_status: z.string().optional(),
  birthday: z.date().optional(),
});

interface Props {
  update(
    address: string,
    postal_code: string,
    country_code: string,
    birthday: string,
    gender: string,
    marital_status: string
  ): void;
  profile: ProfileObject;
}

export default function AdditionalForm(props: Props) {
  const { update, profile } = props;
  const { setIsMarried } = useContext(IsMarriedContext) ?? {
    setIsMarried: undefined,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function createDate17Years() {
    var date = new Date();
    date.setDate(date.getDate());
    date.setMonth(date.getMonth());
    date.setFullYear(date.getFullYear() - 17);
    return date;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      if (setIsMarried) setIsMarried(values.marital_status === "Married");
      const birthday = values.birthday
        ? format(values.birthday, "yyyy-mm-dd")
        : "";
      update(
        values.address,
        values.postal_code,
        values.country_code,
        birthday,
        values.gender || "",
        values.marital_status || ""
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  useEffect(() => {
    if (profile) {
      form.setValue("address", profile.address || "");
      form.setValue("postal_code", profile.postal_code || "");
      form.setValue(
        "birthday",
        profile.birthday
          ? parse(profile.birthday, "yyyy-mm-dd", new Date())
          : undefined
      );
      form.setValue("country_code", profile.country_code || "");
      form.setValue("gender", profile.gender || "");
      form.setValue("marital_status", profile.marital_status || "");
    }
  }, [profile]);

  const minDate = createDate17Years();

  console.log("form", form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2  ">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem gap-1 min-h-20>
              <FormLabel>Home address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Home address"
                  className="resize-none"
                  {...field}
                  defaultValue={profile.address || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postal_code"
          render={({ field }) => (
            <FormItem className="gap-1 h-20">
              <FormLabel>Postal code*</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
                  {...field}
                  defaultValue={profile.postal_code || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country_code"
          render={({ field }) => (
            <FormItem className="gap-1 h-20">
              <FormLabel>Select Country</FormLabel>
              <FormControl>
                <LocationSelector
                  onCountryChange={(country) => {
                    console.log("country", country);
                    //setCountryName(country?.name || "");
                    form.setValue(field.name, country?.iso2 || "");
                  }}
                  selectedIso={profile.country_code || undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    disabled={{ after: minDate }}
                    defaultMonth={
                      new Date(minDate.getFullYear(), minDate.getMonth())
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="gap-1 h-20">
              <FormLabel>Gender</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={profile.gender || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select gender"
                      className="dark:text-white"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marital_status"
          render={({ field }) => (
            <FormItem className="gap-1 h-20">
              <FormLabel>Marital status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={profile.marital_status || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Marital status"
                      className="dark:text-white"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                </SelectContent>
              </Select>
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
