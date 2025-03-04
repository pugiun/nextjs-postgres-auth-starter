import { ProfileObject } from "@/types/profile";

export default function SpouseContent({ profile }: { profile: ProfileObject }) {
  return (
    <div className="w-screen h-full flex flex-col space-y-5">
      <div className="flex flex-col h-14">
        <p className="font-bold">Spouse salutation</p>
        <p>{profile.spouse_salutation || ""}</p>
      </div>
      <div className="flex flex-col h-14">
        <p className="font-bold">Spouse first name</p>
        <p>{profile.spouse_firstname || ""}</p>
      </div>
      <div className="flex flex-col h-14">
        <p className="font-bold">Spouse last name</p>
        <p>{profile.spouse_lastname || ""}</p>
      </div>
    </div>
  );
}
