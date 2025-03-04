import { getProfile } from "@/app/db";
import ProfileContent from "./profile-content";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ProfileObject } from "@/types/profile";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const username = session ? session.user?.name : "";
  const user = await getProfile(username as string);

  console.log("user", user);
  return <ProfileContent profile={user[0] as ProfileObject} />;
}
