import { FileAudio, Music, Video } from "lucide-react";

const FileIcon = ({ name, mime }: { name: string; mime?: string }) => {
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

export default FileIcon;
