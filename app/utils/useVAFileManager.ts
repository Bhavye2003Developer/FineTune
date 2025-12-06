import { useLiveQuery } from "dexie-react-hooks";
import { indexedDB } from "./db";

export const useVAFileManager = () => {
  const storedFiles = useLiveQuery(() => indexedDB.vaFiles.toArray(), []);

  const addFile = async (file: File) => {
    await indexedDB.vaFiles.add({ name: file.name, size: file.size });
  };

  return { storedFiles, addFile };
};
