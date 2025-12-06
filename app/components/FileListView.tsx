import { motion, AnimatePresence } from "framer-motion";
import { useVAFileManager } from "../utils/useVAFileManager";
import FileIcon from "./FileIcon";
import { Delete } from "lucide-react";

const FileListView = () => {
  const { storedFiles, removeFile } = useVAFileManager();

  return (
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
                  <FileIcon name={file.name} mime={file.type} />

                  <div className="flex flex-col">
                    <span className="font-medium text-zinc-900 dark:text-zinc-200">
                      {file.name}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(file.dt).toLocaleString()}
                    </span>
                  </div>

                  <Delete
                    onClick={() => {
                      removeFile(file.id || 0);
                    }}
                  />
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
  );
};

export default FileListView;
