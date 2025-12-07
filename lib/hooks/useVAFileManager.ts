import { useLiveQuery } from "dexie-react-hooks";
import { toast } from "sonner";
import { indexedDB } from "../db";

export const useVAFileManager = () => {
  const storedFiles = useLiveQuery(() => indexedDB.vaFiles.toArray(), []);

  const addFile = async (file: File) => {
    await indexedDB.vaFiles.add({
      name: file.name,
      type: file.type,
      dt: new Date(),
      blob: file,
    });
  };

  const removeFile = async (id: number) => {
    await indexedDB.vaFiles.delete(id);
    toast.success("File deleted successfully.");
  };

  return { storedFiles, addFile, removeFile };
};
