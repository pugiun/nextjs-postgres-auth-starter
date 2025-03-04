import { getProfile } from "@/app/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { CountryProps, ProfileObject } from "@/types/profile";
import DetailsContent from "./details-content";
import countries from "@/data/countries.json";
import { redirect } from "next/navigation";

export default async function DetailsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const username = session ? session.user?.name : "";
  const user = await getProfile(username as string);
  const countriesData = countries;
  const availableCountry = countriesData.filter(
    (country) => country.iso2 === user[0].country_code
  );
  console.log("user", user);
  return (
    <DetailsContent
      profile={user[0] as ProfileObject}
      country={availableCountry[0] as CountryProps}
    />
  );
}
