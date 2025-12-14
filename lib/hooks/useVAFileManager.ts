import { useLiveQuery } from "dexie-react-hooks";
import { toast } from "sonner";
import { indexedDB } from "../db";
import { v6 as uuidv6 } from "uuid";

export const useVAFileManager = () => {
  const storedFiles = useLiveQuery(() => indexedDB.vaFiles.toArray(), []);

  const addFile = async (file: File) => {
    const fileID = uuidv6();
    await indexedDB.vaFiles.add({
      id: fileID,
      name: file.name,
      type: file.type,
      dt: new Date(),
      blob: file,
    });
  };

  const removeFile = async (id: string) => {
    await indexedDB.vaFiles.delete(id);
    toast.success("File deleted successfully.");
  };

  return { storedFiles, addFile, removeFile };
};
