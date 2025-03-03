import { SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-6">
        <h1 className="mb-4 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-4xl font-bold text-transparent">
          Welcome
        </h1>

        <p className="mb-6 text-center text-blue-300">
          Sign in to access your secure storage space
        </p>

        {/* <div className="border border-blue-700 bg-blue-900/50 p-8 shadow-lg"> */}
        <SignInButton forceRedirectUrl={"/drive"}>
          <button className="rounded-sm border border-blue-600 bg-blue-900/50 px-6 py-3 text-base font-light text-white transition-colors hover:bg-blue-500/20">
            Sign in to continue
          </button>
        </SignInButton>
      </div>
      {/* </div> */}
    </>
  );
}
