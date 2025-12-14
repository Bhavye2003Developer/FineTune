"use client";

import { useMemo, useRef } from "react";
import { useVAFileManager } from "../../lib/hooks/useVAFileManager";
import { motion } from "framer-motion";
import {
  APP_NAME,
  MAX_FILE_BYTES,
  MEGABYTE,
  STORAGE_LIMIT,
} from "../../lib/constants";
import { toast } from "sonner";
import { UploadIcon } from "lucide-react";
import FileListView from "./FileListView";
import dynamic from "next/dynamic";

const PlayerHome = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { storedFiles, addFile } = useVAFileManager();

  const Player = dynamic(() => import("./Player"), { ssr: false });

  const totalStoredFilesSize = useMemo(() => {
    if (!storedFiles) return 0;
    return storedFiles.reduce((p, f) => p + f.blob.size, 0);
  }, [storedFiles]);

  const filenames = storedFiles?.map((file) => file.name);

  return (
    <main className="min-h-screen dark:bg-black">
      <div
        className="
          mx-auto w-full max-w-xl
          px-4 sm:px-6
          pt-6 pb-12
          space-y-6
        "
      >
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {APP_NAME}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              inline-flex items-center gap-2
              rounded-lg border border-zinc-300
              bg-white px-3 py-1.5
              text-xs sm:text-sm
              text-zinc-600 shadow-sm
              dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300
            "
          >
            Storage used
            <span className="font-medium">
              {Math.round(totalStoredFilesSize / MEGABYTE)} MB
            </span>
          </motion.div>
        </div>

        {/* File Input */}
        <input
          type="file"
          multiple
          accept="audio/*, video/*"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (!files) return;

            for (const file of files) {
              if (file.size > MAX_FILE_BYTES)
                toast.error("You can't upload a file more than 50MB!");
              else if (totalStoredFilesSize + file.size > STORAGE_LIMIT)
                toast.error(
                  "Max files storage size limit reached, please remove a file"
                );
              else if (filenames?.includes(file.name))
                toast.error("File with name already exists!");
              else addFile(file);
            }
          }}
        />

        {/* Player */}
        <section>
          <Player />
        </section>

        {/* Upload Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
          onClick={() => fileInputRef.current?.click()}
          className="
            w-full sm:w-auto
            flex items-center justify-center gap-2
            rounded-xl border border-zinc-300
            bg-white px-5 py-3
            text-sm font-medium shadow-sm
            transition
            hover:bg-zinc-100
            dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800
          "
        >
          <UploadIcon className="h-4 w-4" />
          Upload files
        </motion.button>

        {/* File List */}
        <section>
          <FileListView />
        </section>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="
            pt-6 text-center
            text-xs sm:text-sm
            text-zinc-500 dark:text-zinc-400
          "
        >
          ⭐ If you liked the app, please{" "}
          <a
            href="https://github.com/Bhavye2003Developer/FineTune"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-1
              font-medium
              underline underline-offset-4
              hover:text-zinc-800 dark:hover:text-zinc-200
              transition-colors
            "
          >
            star it on GitHub
          </a>
        </motion.div>
      </div>
    </main>
  );
};

export default PlayerHome;
