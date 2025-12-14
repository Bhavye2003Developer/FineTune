import { FileAudio, Music, Video } from "lucide-react";

type Props = {
  name: string;
  mime?: string;
};

const FileIcon = ({ name, mime }: Props) => {
  const lower = name.toLowerCase();

  const isAudio =
    lower.endsWith(".mp3") ||
    lower.endsWith(".wav") ||
    lower.endsWith(".flac") ||
    mime?.startsWith("audio");

  const isVideo =
    lower.endsWith(".mp4") ||
    lower.endsWith(".mkv") ||
    lower.endsWith(".webm") ||
    mime?.startsWith("video");

  const Icon = isAudio ? Music : isVideo ? Video : FileAudio;

  return (
    <Icon
      className="
        h-5 w-5 shrink-0
        text-zinc-500 dark:text-zinc-400
        transition-all duration-200
        group-hover:text-zinc-800 dark:group-hover:text-zinc-200
      "
    />
  );
};

export default FileIcon;
