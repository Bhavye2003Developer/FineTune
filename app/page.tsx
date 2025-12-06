"use client";

import { UploadIcon } from "lucide-react";
import { useRef } from "react";
import { useVAFileManager } from "./utils/useVAFileManager";
import { toast } from "sonner";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_BYTES = 1024 * 1024 * 50;

  const { storedFiles, addFile } = useVAFileManager();

  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <main className="mx-auto flex w-full max-w-3xl flex-col px-8 py-16">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight">
          Local Player
        </h1>

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
                else addFile(tmpFile);
              }
            }
          }}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="mb-10 flex w-fit items-center gap-2 rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium shadow-sm transition-all hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          <UploadIcon className="h-5 w-5" />
          Upload Files
        </button>

        <div className="rounded-2xl border border-zinc-300 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 text-lg font-semibold tracking-tight">
            File Stack
          </div>

          <div className="space-y-3 text-sm">
            {storedFiles && storedFiles.length > 0 ? (
              storedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-800/40"
                >
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    {file.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-zinc-500 dark:text-zinc-400">
                No audio/video file uploaded yet.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
