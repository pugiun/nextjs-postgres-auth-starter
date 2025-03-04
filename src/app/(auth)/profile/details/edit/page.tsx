import { getProfile, updateAdditionalDetails } from "@/app/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ProfileObject } from "@/types/profile";
import AdditionalForm from "@/components/forms/additional-form";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const username = session ? session.user?.name : "";
  const user = await getProfile(username as string);

  async function update(
    address: string,
    postal_code: string,
    country_code: string,
    birthday: string,
    gender: string,
    marital_status: string
  ) {
    "use server";
    let response = await updateAdditionalDetails(
      username as string,
      address,
      postal_code,
      country_code,
      birthday,
      gender,
      marital_status
    );

    redirect("/profile/details");
  }
  console.log("user", user);
  return (
    <AdditionalForm
      update={update}
      profile={user[0] as unknown as ProfileObject}
    />
  );
}
