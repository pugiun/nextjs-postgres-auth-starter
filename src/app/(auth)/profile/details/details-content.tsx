"use client";
import { IsMarriedContext } from "@/app/providers";
import { CountryProps, ProfileObject } from "@/types/profile";
import { format, parse } from "date-fns";
import { useContext, useEffect } from "react";

export default function DetailsContent({
  profile,
  country,
}: {
  profile: ProfileObject;
  country: CountryProps;
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
      <div className="flex flex-col min-h-14">
        <p className="font-bold">Home address</p>
        <p>{profile.address || ""}</p>
      </div>
      <div className="flex flex-col min-h-14">
        <p className="font-bold">Postal Code</p>
        <p>{profile.postal_code || ""}</p>
      </div>
      <div className="flex flex-col min-h-14">
        <p className="font-bold">Country</p>
        <p>{country ? country.name : ""}</p>
      </div>
      <div className="flex flex-col min-h-14">
        <p className="font-bold">Date of birth</p>
        <p>
          {profile.birthday
            ? format(
                parse(profile.birthday, "yyyy-mm-dd", new Date()),
                "MMMM d, yyyy"
              )
            : ""}
        </p>
      </div>
      <div className="flex flex-col h-14">
        <p className="font-bold">Gender</p>
        <p>
          {profile.gender ? (profile.gender === "M" ? "Male" : "Female") : ""}
        </p>
      </div>
      <div className="flex flex-col h-14">
        <p className="font-bold">Marital status</p>
        <p>{profile.marital_status || ""}</p>
      </div>
    </div>
  );
}
