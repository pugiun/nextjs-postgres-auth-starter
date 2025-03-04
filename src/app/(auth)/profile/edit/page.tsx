import { getProfile, updateDetails } from "@/app/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import DetailsForm from "@/components/forms/details-form";
import { ProfileObject } from "@/types/profile";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const username = session ? session.user?.name : "";
  const user = await getProfile(username as string);

  async function updateProfileDetails(
    salutation: string,
    firstname: string,
    lastname: string,
    email: string
  ) {
    "use server";
    let response = await updateDetails(
      username as string,
      salutation,
      firstname,
      lastname,
      email
    );

    console.log("response", response);
    redirect("/profile");
  }
  console.log("user", user);
  return (
    <DetailsForm
      update={updateProfileDetails}
      profile={user[0] as unknown as ProfileObject}
    />
  );
}
