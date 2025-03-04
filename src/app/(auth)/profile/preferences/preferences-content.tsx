import { ProfileObject } from "@/types/profile";

export default function PreferencesContent({
  profile,
}: {
  profile: ProfileObject;
}) {
  return (
    <div className="w-screen h-full flex flex-col space-y-5">
      <div className="flex flex-col h-14">
        <p className="font-bold">Hobbies and interests</p>
        <p>{profile.hobbies || ""}</p>
      </div>
      <div className="flex flex-col h-14">
        <p className="font-bold">Favorite sports(s)</p>
        <p>{profile.sports || ""}</p>
      </div>
      <div className="flex flex-col h-14">
        <p className="font-bold">Preferred music genre(s)</p>
        <p>{profile.music || ""}</p>
      </div>
      <div className="flex flex-col h-14">
        <p className="font-bold">Preferred movie/TV shows(s)</p>
        <p>{profile.shows || ""}</p>
      </div>
    </div>
  );
}
