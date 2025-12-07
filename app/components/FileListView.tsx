"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useVAFileManager } from "../utils/hooks/useVAFileManager";
import FileIcon from "./FileIcon";
import { Trash2 } from "lucide-react";
import usePlayerStore from "../utils/hooks/usePlayerStore";

const FileListView = () => {
  const { storedFiles, removeFile } = useVAFileManager();
  const { selectFile } = usePlayerStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-2xl border border-zinc-200 
        bg-white/80 dark:bg-zinc-900/40 
        shadow-lg backdrop-blur-xl 
        p-6
      "
    >
      <div className="mb-6 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        File Stack
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {storedFiles && storedFiles.length > 0 ? (
            storedFiles.map((file, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                whileHover={{ scale: 1.009 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="
                  group flex items-center justify-between 
                  rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 
                  bg-zinc-50/80 dark:bg-zinc-800/30
                  px-4 py-3 
                  shadow-sm hover:shadow-md
                  hover:bg-white/90 dark:hover:bg-zinc-800/60
                  transition-all backdrop-blur-sm
                  cursor-default
                "
              >
                <div
                  className="flex items-center gap-3 overflow-hidden"
                  onClick={() => selectFile(file)}
                >
                  <FileIcon name={file.name} mime={file.type} />

                  <div className="flex flex-col overflow-hidden">
                    <span
                      className="
                        font-medium truncate 
                        text-zinc-900 dark:text-zinc-100
                      "
                    >
                      {file.name}
                    </span>

                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(file.dt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id || 0);
                  }}
                  className="
                    transition-opacity duration-150 
                    p-2 rounded-lg 
                    text-zinc-500 dark:text-zinc-400 
                  "
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-2 text-zinc-500 dark:text-zinc-400 text-sm"
            >
              No audio/video file uploaded yet.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FileListView;
