import { getProfile, updateSpouse } from "@/app/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ProfileObject } from "@/types/profile";
import { redirect } from "next/navigation";
import SpouseForm from "@/components/forms/spouse-form";

export default async function SpousePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const username = session ? session.user?.name : "";
  const user = await getProfile(username as string);

  async function update(
    spouse_salutation: string,
    spouse_firstname: string,
    spouse_lastname: string
  ) {
    "use server";
    let response = await updateSpouse(
      username as string,
      spouse_salutation,
      spouse_firstname,
      spouse_lastname
    );

    console.log("response", response);
    redirect("/profile/spouse");
  }
  console.log("user", user);
  return (
    <SpouseForm update={update} profile={user[0] as unknown as ProfileObject} />
  );
}
