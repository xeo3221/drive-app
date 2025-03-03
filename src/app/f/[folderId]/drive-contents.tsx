"use client";
import {
  Upload,
  ChevronRight,
  HardDriveIcon,
  LoaderCircle,
} from "lucide-react";
import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";
import { useRouter } from "next/navigation";
import { FileRow, FolderRow } from "./file-row";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
}) {
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-blue-900 p-8 text-blue-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <p className="mr-2 flex items-center text-blue-500">
              <HardDriveIcon className="mr-2" size={18} />
              My Drive
            </p>
            {props.parents.map((folder, _index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-blue-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-blue-300 hover:text-blue-200"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>

        <div className="my-5 flex justify-end">
          <UploadButton
            endpoint="driveUploader"
            onClientUploadComplete={() => {
              navigate.refresh();
            }}
            input={{
              folderId: props.currentFolderId,
            }}
            className="ut-button:rounded-sm ut-button:border ut-button:border-blue-600 ut-button:bg-blue-900/50 ut-button:px-6 ut-button:py-3 ut-button:text-base ut-button:font-light ut-button:text-white ut-button:transition-colors ut-button:hover:bg-blue-500/20"
            content={{
              button({ isUploading }) {
                return (
                  <div className="flex items-center gap-2">
                    {isUploading ? (
                      <>
                        <LoaderCircle className="animate-spin" size={16} />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        <span>Add files</span>
                      </>
                    )}
                  </div>
                );
              },
            }}
          />
        </div>
        <div className="rounded-md border border-blue-700 bg-blue-900/40 shadow-xl">
          <div className="border-b border-blue-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-blue-300">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul className="divide-y divide-blue-800/40">
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
            {props.folders.length === 0 && props.files.length === 0 && (
              <li className="flex flex-col items-center justify-center px-6 py-12 text-center text-blue-400">
                <div className="mb-4 rounded-full bg-blue-900/70 p-4">
                  <Upload size={24} className="text-blue-300" />
                </div>
                <p>This folder is empty.</p>
                <p className="text-sm text-blue-500">
                  Upload files to get started.
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
