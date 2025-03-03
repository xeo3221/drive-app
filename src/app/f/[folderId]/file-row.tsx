import {
  File as FileIcon,
  Folder as FolderIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { deleteFile } from "~/server/actions";
import type { files_table, folders_table } from "~/server/db/schema";

export function FileRow(props: { file: typeof files_table.$inferSelect }) {
  const { file } = props;
  return (
    <li
      key={file.id}
      className="border-b border-blue-800/40 px-6 py-4 transition-colors hover:bg-blue-900/60"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-blue-100 transition-colors hover:text-blue-300"
            target="_blank"
          >
            <FileIcon className="mr-3 text-blue-400" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-2 text-blue-400">File</div>
        <div className="col-span-3 text-blue-400">{file.size}</div>
        <div className="col-span-1">
          <Button
            variant={"ghost"}
            onClick={() => deleteFile(file.id)}
            aria-label="Delete file"
            className="text-blue-400 hover:bg-blue-800/50 hover:text-blue-200"
          >
            <Trash2Icon size={20} />
          </Button>
        </div>
      </div>
    </li>
  );
}

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
}) {
  const { folder } = props;
  return (
    <li
      key={folder.id}
      className="border-b border-blue-800/40 px-6 py-4 transition-colors hover:bg-blue-900/60"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-blue-100 transition-colors hover:text-blue-300"
          >
            <FolderIcon className="mr-3 text-blue-400" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-blue-400"></div>
        <div className="col-span-1"></div>
      </div>
    </li>
  );
}
