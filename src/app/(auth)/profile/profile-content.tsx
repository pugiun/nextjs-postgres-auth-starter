"use client";
import { IsMarriedContext } from "@/app/providers";
import { ProfileObject } from "@/types/profile";
import { useContext, useEffect } from "react";

export default function ProfileContent({
  profile,
}: {
  profile: ProfileObject;
}) {
  const { setIsMarried } = useContext(IsMarriedContext) ?? {
    setIsMarried: undefined,
  };

  useEffect(() => {
    if (profile) {
      setIsMarried(profile.marital_status === "Married");
    }
  }, [profile]);

  return (
    <div className="w-screen h-full flex flex-col space-y-5">
      <div className="flex flex-col h-14">
        <p className="font-bold">Salutation</p>
        <p>{profile.salutation || ""}</p>
      </div>
      <div className="flex flex-col h-14">
        <p className="font-bold">First name</p>
        <p>{profile.firstname || ""}</p>
      </div>
      <div className="flex flex-col h-14">
        <p className="font-bold">Last name</p>
        <p>{profile.lastname || ""}</p>
      </div>
      <div className="flex flex-col h-14">
        <p className="font-bold">Email address</p>
        <p>{profile.email || ""}</p>
      </div>
    </div>
  );
}
