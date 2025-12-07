"use client";

import { useMemo, useRef } from "react";
import { useVAFileManager } from "../../lib/hooks/useVAFileManager";
import { motion } from "framer-motion";
import { MAX_FILE_BYTES, MEGABYTE, STORAGE_LIMIT } from "../../lib/constants";
import { toast } from "sonner";
import { UploadIcon } from "lucide-react";
import FileListView from "./FileListView";
import dynamic from "next/dynamic";

const PlayerHome = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { storedFiles, addFile } = useVAFileManager();

  const Player = dynamic(() => import("./Player"), { ssr: false });

  const totalStoredFilesSize = useMemo(() => {
    if (storedFiles) {
      const totalFilesSize = storedFiles.reduce(
        (prev, file) => prev + file.blob.size,
        0
      );
      return totalFilesSize;
    }
    return 0;
  }, [storedFiles]);

  const filenames = storedFiles?.map((file) => file.name);

  return (
    <div>
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">Off Player</h1>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2 flex w-fit items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 backdrop-blur-sm"
      >
        <span className="font-medium">Storage Used:</span>
        <span>{Math.round(totalStoredFilesSize / MEGABYTE)} MB</span>
      </motion.div>

      <input
        type="file"
        className="hidden"
        multiple
        accept="audio/*, video/*"
        ref={fileInputRef}
        onChange={(e) => {
          const tmpFiles = e.target.files;
          if (tmpFiles) {
            for (const tmpFile of tmpFiles) {
              if (tmpFile.size > MAX_FILE_BYTES)
                toast.error("You can't upload a file more than 50MB!");
              else if (totalStoredFilesSize + tmpFile.size > STORAGE_LIMIT)
                toast.error(
                  "Max files storage size limit reached, please remove any file"
                );
              else if (filenames && filenames.includes(tmpFile.name))
                toast.error("File with name already exists!");
              else addFile(tmpFile);
            }
          }
        }}
      />

      <Player />

      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => fileInputRef.current?.click()}
        className="mt-2 mb-12 flex w-fit items-center gap-3 rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium shadow-sm transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
      >
        <UploadIcon className="h-5 w-5" />
        Upload Files
      </motion.button>

      <FileListView />
    </div>
  );
};

export default PlayerHome;
