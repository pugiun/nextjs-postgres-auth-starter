import Sidebar from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";
import { User2Icon } from "lucide-react";
import ProfileHeader from "@/components/profile/header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <div className="flex flex-row justify-end gap-x-10 w-full overflow-hidden">
      <MobileNav />
      <Sidebar />

      <div
        className={cn(
          "w-full",
          "md:w-[calc(100vw-60px)] xl:w-[calc(100vw-250px)]"
        )}
      >
        <div className="h-full md:h-screen flex flex-col space-y-5 pt-20 px-3 md:px-0 ">
          <ProfileHeader />
          <div className="flex flex-row items-start md:gap-x-5 w-full mb-10">
            <div className="">
              <User2Icon size={80} className="hidden md:inline" />
            </div>
            <div className="flex flex-col w-full max-w-xl">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
