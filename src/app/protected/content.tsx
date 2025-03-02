"use client";
import { signOut, useSession } from "next-auth/react";

export default function ProtectedContent() {
  const { data: session, status } = useSession();
  console.log("session", session, status);
  return (
    <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-white">
      You are logged in as {session?.user?.email}
      <button
        onClick={() =>
          signOut({
            callbackUrl: "/login",
          })
        }
      >
        Sign out
      </button>
    </div>
  );
}
