import { useLiveQuery } from "dexie-react-hooks";
import { indexedDB } from "./db";

export const useVAFileManager = () => {
  const storedFiles = useLiveQuery(() => indexedDB.vaFiles.toArray(), []);

  const addFile = async (file: File) => {
    const content = await file.arrayBuffer();
    await indexedDB.vaFiles.add({
      name: file.name,
      type: file.type,
      size: file.size,
      dt: new Date(),
      content,
    });
  };

  return { storedFiles, addFile };
};
