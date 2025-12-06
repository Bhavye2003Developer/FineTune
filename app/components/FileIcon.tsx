import { FileAudio, Music, Video } from "lucide-react";

const FileIcon = ({ name, mime }: { name: string; mime?: string }) => {
  const lower = name.toLowerCase();
  const isAudio =
    lower.endsWith(".mp3") ||
    lower.endsWith(".wav") ||
    mime?.startsWith("audio");

  const isVideo =
    lower.endsWith(".mp4") ||
    lower.endsWith(".mkv") ||
    mime?.startsWith("video");

  const Icon = isAudio ? Music : isVideo ? Video : FileAudio;

  return (
    <Icon
      className="
        h-5 w-5
        text-zinc-600 dark:text-zinc-300
        transition-opacity duration-200
        opacity-80 group-hover:opacity-100
      "
    />
  );
};

export default FileIcon;
