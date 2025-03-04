"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileHeader() {
  const pathName = usePathname();
  const isEdit = pathName.includes("edit");
  return (
    <div className="flex flex-row w-full justify-between max-w-2xl gap-x-3">
      <h1 className="text-xl md:text-2xl">
        {isEdit ? "Edit" : "My"} <span className="font-bold">Profile</span>
      </h1>
      <hr className="grow mt-6" />
      <Link
        className="mt-1 md:mt-2"
        href={isEdit ? pathName.replace("/edit", "") : pathName + "/edit"}
      >
        {isEdit ? "Go back to My Profile" : "Edit profile"}
      </Link>
    </div>
  );
}
