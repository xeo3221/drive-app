import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as fodlersSchema,
} from "~/server/db/schema";
import DriveContents from "./drive-contents";

export default async function GoogleDriveClone() {
  const files = await db.select().from(filesSchema);
  const folders = await db.select().from(fodlersSchema);
  return <DriveContents files={files} folders={folders} />;
}
