"use client";

import { UploadIcon, Music, Video, FileAudio } from "lucide-react";
import { useMemo, useRef } from "react";
import { useVAFileManager } from "./utils/useVAFileManager";
import { toast } from "sonner";
import { MAX_FILE_BYTES, MEGABYTE, STORAGE_LIMIT } from "./utils/constants";
import { motion, AnimatePresence } from "framer-motion";

export const getFileIcon = (name: string, mime?: string) => {
  const lower = name.toLowerCase();
  if (
    lower.endsWith(".mp3") ||
    lower.endsWith(".wav") ||
    mime?.startsWith("audio")
  )
    return <Music className="h-5 w-5" />;
  if (
    lower.endsWith(".mp4") ||
    lower.endsWith(".mkv") ||
    mime?.startsWith("video")
  )
    return <Video className="h-6 w-6" />;
  return <FileAudio className="h-5 w-5" />;
};

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { storedFiles, addFile } = useVAFileManager();

  const totalStoredFilesSize = useMemo(() => {
    if (storedFiles) {
      const totalFilesSize = storedFiles.reduce(
        (prev, file) => prev + file.size,
        0
      );
      return totalFilesSize;
    }
    return 0;
  }, [storedFiles]);

  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <main className="mx-auto flex w-full max-w-3xl flex-col px-8 py-16">
        <h1 className="mb-8 text-4xl font-semibold tracking-tight">
          Local Player
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex w-fit items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 backdrop-blur-sm"
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
                else addFile(tmpFile);
              }
            }
          }}
        />

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => fileInputRef.current?.click()}
          className="mb-12 flex w-fit items-center gap-3 rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium shadow-sm transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          <UploadIcon className="h-5 w-5" />
          Upload Files
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-zinc-300 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 backdrop-blur-sm"
        >
          <div className="mb-4 text-xl font-semibold tracking-tight">
            File Stack
          </div>

          <div className="space-y-3 text-sm">
            <AnimatePresence mode="popLayout">
              {storedFiles && storedFiles.length > 0 ? (
                storedFiles.map((file, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/40 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.name, file.type)}

                      <div className="flex flex-col">
                        <span className="font-medium text-zinc-900 dark:text-zinc-200">
                          {file.name}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {new Date(file.dt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-2 text-zinc-500 dark:text-zinc-400"
                >
                  No audio/video file uploaded yet.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
