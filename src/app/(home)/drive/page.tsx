import { auth } from "@clerk/nextjs/server";
import { HardDriveIcon, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

export default async function DrivePage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

  if (!rootFolder) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-3xl font-bold text-blue-300">
          Welcome to Your Drive
        </h1>
        <p className="max-w-md text-blue-400">
          Get started by creating your personal storage space
        </p>
        <form
          action={async () => {
            "use server";
            const session = await auth();

            if (!session.userId) {
              return redirect("/sign-in");
            }

            const rootFolderId = await MUTATIONS.onboardUser(session.userId);

            return redirect(`/f/${rootFolderId}`);
          }}
        >
          <Button className="m-4 border border-blue-600 bg-blue-900/50 p-8 text-white transition-colors hover:bg-blue-500/20">
            <Plus className="text-white" size={24} />
            Create new Drive
            <HardDriveIcon className="ml-2 text-white" size={24} />
          </Button>
        </form>
      </div>
    );
  }

  return redirect(`/f/${rootFolder.id}`);
}
