import { getProfile } from "@/app/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ProfileObject } from "@/types/profile";
import PreferencesContent from "./preferences-content";
import { redirect } from "next/navigation";

export default async function SpousePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const username = session ? session.user?.name : "";
  const user = await getProfile(username as string);

  console.log("user", user);
  return <PreferencesContent profile={user[0] as ProfileObject} />;
}
