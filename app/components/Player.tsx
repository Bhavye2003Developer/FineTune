"use client";

import { useEffect, useRef, useState } from "react";
import usePlayerStore from "../../lib/hooks/usePlayerStore";
import { Play, Pause, Repeat } from "lucide-react";
import { fmt } from "@/lib/utils";

// remove file as soon as file deletes.

const Player = () => {
  const { selectedFile } = usePlayerStore();
  const [duration, setDuration] = useState("-/-");
  const [isPlay, setPlay] = useState(false);
  const [isLooped, setIsLooped] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(new Audio(undefined));

  useEffect(() => {
    if (!selectedFile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDuration("-/-");
      setPlay(false);
      audioRef.current.pause();
      audioRef.current.src = "";
      return;
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    const url = URL.createObjectURL(selectedFile.blob);
    audioRef.current.src = url;

    audioRef.current.onloadedmetadata = () => {
      setDuration(fmt(audioRef.current.duration));
      setPlay(false);
    };

    audioRef.current.onended = () => setPlay(false);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = isLooped;

    if (isPlay) audio.play();
    else audio.pause();
  }, [isPlay, isLooped]);

  return (
    <div
      className="
      rounded-2xl border border-zinc-300 bg-white/70 
      m-2 p-6 shadow-sm backdrop-blur-md
      dark:border-zinc-700 dark:bg-zinc-900/40
    "
    >
      <div className="mb-3 text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-200">
        Now Playing
      </div>

      <div
        className="
        text-sm mb-5 truncate
        text-zinc-700 dark:text-zinc-300 font-medium
      "
      >
        {selectedFile?.name || "No file selected"}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Duration: <span className="font-semibold">{duration}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlay(!isPlay)}
            className="
              flex items-center gap-2 rounded-xl
              border border-zinc-200 dark:border-zinc-700
              bg-zinc-100 dark:bg-zinc-800
              px-4 py-2 text-sm font-medium
              transition-all duration-200
              hover:bg-zinc-200 dark:hover:bg-zinc-700
              active:scale-95
            "
          >
            {isPlay && selectedFile ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Play
              </>
            )}
          </button>

          <button
            onClick={() => setIsLooped(!isLooped)}
            className={`
              flex items-center rounded-xl
              border border-zinc-200 dark:border-zinc-700
              bg-zinc-100 dark:bg-zinc-800
              px-3 py-2 transition-all duration-200
              hover:bg-zinc-200 dark:hover:bg-zinc-700
              active:scale-95
              ${
                isLooped
                  ? "text-green-400 ring-1 ring-green-400/50 shadow-sm"
                  : ""
              }
            `}
          >
            <Repeat className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
