import LoginForm from "@/components/forms/login-form";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col ">
      <h1 className="text-4xl">
        Welcome to <span className="font-bold">myApp</span>
      </h1>
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl mt-16">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200  px-4 py-6 pt-8 text-center sm:px-16">
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
