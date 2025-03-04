import { getProfile, updatePreferences } from "@/app/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ProfileObject } from "@/types/profile";
import { redirect } from "next/navigation";
import PreferencesForm from "@/components/forms/preferences-form";

export default async function PreferencesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const username = session ? session.user?.name : "";
  const user = await getProfile(username as string);

  async function update(
    hobbies: string,
    sports: string,
    music: string,
    shows: string
  ) {
    "use server";
    let response = await updatePreferences(
      username as string,
      hobbies,
      sports,
      music,
      shows
    );

    console.log("response", response);
    redirect("/profile/preferences");
  }
  console.log("user", user);
  return (
    <PreferencesForm
      update={update}
      profile={user[0] as unknown as ProfileObject}
    />
  );
}
