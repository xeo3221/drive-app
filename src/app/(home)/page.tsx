import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <>
      <h1 className="mb-4 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
        Your Personal Drive
      </h1>
      <p className="mx-auto mb-8 max-w-md text-xl text-blue-300 md:text-2xl">
        Secure, fast, and easy file storage for the modern web
      </p>
      <form
        action={async () => {
          "use server";

          const session = await auth();

          if (!session.userId) {
            return redirect("/sign-in");
          }

          return redirect("/drive");
        }}
      >
        <Button
          size="lg"
          type="submit"
          className="border border-blue-700 bg-blue-900 text-white transition-colors hover:bg-blue-800"
        >
          Get Started
        </Button>
      </form>
    </>
  );
}
