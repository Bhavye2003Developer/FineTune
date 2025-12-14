"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useVAFileManager } from "../../lib/hooks/useVAFileManager";
import FileIcon from "./FileIcon";
import { ListStart, Trash2 } from "lucide-react";
import usePlayerStore from "../../lib/hooks/usePlayerStore";

const FileListView = () => {
  const { storedFiles, removeFile } = useVAFileManager();
  const { selectFile, addToNext } = usePlayerStore();

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-2xl border border-zinc-200
        bg-white/80 dark:bg-zinc-900/50
        shadow-md backdrop-blur-xl
        p-4 sm:p-6
      "
    >
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        File Stack
      </h2>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {storedFiles && storedFiles.length > 0 ? (
            storedFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="
                  flex items-center gap-3
                  rounded-xl border border-zinc-200/60
                  bg-zinc-50/80
                  px-3 py-2.5
                  dark:border-zinc-800/60 dark:bg-zinc-800/30
                "
              >
                <button
                  onClick={() => selectFile(file)}
                  className="
                    flex flex-1 items-center gap-3 overflow-hidden
                    text-left
                    rounded-lg
                    px-2 py-1
                    transition-colors
                    hover:bg-zinc-100 dark:hover:bg-zinc-800/60
                  "
                >
                  <FileIcon name={file.name} mime={file.type} />

                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {file.name}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(file.dt).toLocaleString()}
                    </div>
                  </div>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => addToNext(file)}
                    title="Play next"
                    className="
                      rounded-lg p-2
                      text-zinc-500 dark:text-zinc-400
                      transition-colors
                      hover:bg-zinc-200/60 hover:text-zinc-900
                      dark:hover:bg-zinc-700/60 dark:hover:text-zinc-100
                    "
                  >
                    <ListStart className="h-4 w-4 stroke-[2.2]" />
                  </button>

                  <button
                    onClick={() => removeFile(file.id)}
                    title="Remove"
                    className="
                      rounded-lg p-2
                      text-zinc-500 dark:text-zinc-400
                      transition-colors
                      hover:bg-red-500/10 hover:text-red-500
                    "
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-6 text-center text-sm text-zinc-500 dark:text-zinc-400"
            >
              No audio or video files uploaded yet.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default FileListView;
