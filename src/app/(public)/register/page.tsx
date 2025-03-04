import RegisterForm from "@/components/forms/register-form";
import { redirect } from "next/navigation";
import { createUser, getUser } from "src/app/db";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default async function Register({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const _searchParams = await searchParams;
  const error = _searchParams.error ? (_searchParams.error as string) : "";
  console.log("error", error);
  async function register(username: string, password: string) {
    "use server";
    let user = await getUser(username);

    if (user.length > 0) {
      redirect("/register?error=exists");
    } else {
      await createUser(username, password);
      redirect("/login");
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col ">
      <h1 className="text-xl md:text-4xl">
        Welcome to <span className="font-bold">myApp</span>
      </h1>
      <div className="z-10 w-full max-w-md overflow-hidden mt-10  md:mt-16 pr-5 md:pr-0">
        <RegisterForm register={register} />
        {error === "exists" && (
          <Alert
            variant="destructive"
            className="mt-10 bg-red-800 text-white font-bold"
          >
            <AlertDescription>User ID has already been taken.</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
