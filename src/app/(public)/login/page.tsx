import LoginForm from "@/components/forms/login-form";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const _searchParams = await searchParams;
  const error = _searchParams.error ? (_searchParams.error as string) : "";
  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col ">
      <h1 className="text-xl md:text-4xl">
        Welcome to <span className="font-bold">myApp</span>
      </h1>
      <div className="z-10 w-full max-w-md overflow-hidden mt-10  md:mt-16 pr-5 md:pr-0">
        <LoginForm />
        {error === "CredentialsSignin" && (
          <Alert
            variant="destructive"
            className="mt-10 bg-red-800 text-white font-bold"
          >
            <AlertDescription>
              Your user ID and/or password does not match.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
