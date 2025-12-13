"use client";

import { useEffect, useRef, useState } from "react";
import usePlayerStore from "../../lib/hooks/usePlayerStore";
import { Play, Pause, Repeat } from "lucide-react";
import { fmt } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

const Player = () => {
  const { selectedFile } = usePlayerStore();

  const [duration, setDuration] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);
  const [isLooped, setIsLooped] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlay(false);
    setCurrentDuration(0);
    setDuration(0);

    audio.pause();
    audio.currentTime = 0;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    if (!selectedFile) {
      audio.src = "";
      return;
    }

    const url = URL.createObjectURL(selectedFile.blob);
    objectUrlRef.current = url;
    audio.src = url;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.ontimeupdate = () => {
      setCurrentDuration(audio.currentTime);
    };

    audio.onended = () => {
      if (!audio.loop) setPlay(false);
    };

    audio.onerror = () => {
      setPlay(false);
      setDuration(0);
      setCurrentDuration(0);
    };
  }, [selectedFile]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !selectedFile) return;

    audio.loop = isLooped;

    if (isPlay) audio.play();
    else audio.pause();
  }, [isPlay, isLooped, selectedFile]);

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = value[0];
    setCurrentDuration(value[0]);
  };

  return (
    <div
      className="
        rounded-2xl border border-zinc-300 bg-white/70
        m-2 p-6 shadow-sm backdrop-blur-md
        dark:border-zinc-700 dark:bg-zinc-900/40
      "
    >
      <div className="mb-3 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
        Now Playing
      </div>

      <div className="mb-5 truncate text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {selectedFile?.name || "No file selected"}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          {fmt(currentDuration)} /{" "}
          <span className="font-semibold">{fmt(duration)}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={!selectedFile}
            onClick={() => setPlay((p) => !p)}
            className="
              flex items-center gap-2 rounded-xl
              border border-zinc-200 dark:border-zinc-700
              bg-zinc-100 dark:bg-zinc-800
              px-4 py-2 text-sm font-medium
              transition-all duration-200
              hover:bg-zinc-200 dark:hover:bg-zinc-700
              active:scale-95 disabled:opacity-50
            "
          >
            {isPlay ? (
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
            onClick={() => setIsLooped((l) => !l)}
            className={`
              flex items-center rounded-xl
              border border-zinc-200 dark:border-zinc-700
              bg-zinc-100 dark:bg-zinc-800
              px-3 py-2 transition-all duration-200
              hover:bg-zinc-200 dark:hover:bg-zinc-700
              active:scale-95
              ${isLooped ? "text-green-400 ring-1 ring-green-400/50" : ""}
            `}
          >
            <Repeat className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Slider
        value={[currentDuration]}
        max={duration || 0}
        step={0.1}
        onValueChange={handleSeek}
      />
    </div>
  );
};

export default Player;
