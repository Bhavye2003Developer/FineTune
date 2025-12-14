"use client";

import { useEffect, useRef, useState } from "react";
import usePlayerStore from "../../lib/hooks/usePlayerStore";
import { Play, Pause, Repeat, VolumeX, Volume2 } from "lucide-react";
import { fmt } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

const Player = () => {
  const { selectedFile, nextFile, selectFile } = usePlayerStore();

  const [duration, setDuration] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [isMute, setIsMute] = useState(false);

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
    if (!audio || !selectedFile) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlay(true);
    setCurrentDuration(0);
    setDuration(0);

    audio.pause();
    audio.currentTime = 0;

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

    const url = URL.createObjectURL(selectedFile.blob);
    objectUrlRef.current = url;
    audio.src = url;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
      audio.play().catch(() => setPlay(false));
    };

    audio.ontimeupdate = () => setCurrentDuration(audio.currentTime);

    audio.onended = () => {
      if (nextFile) selectFile(nextFile);
      else setPlay(false);
    };
  }, [selectedFile, nextFile, selectFile]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = isLooped;
    audio.muted = isMute;

    if (isPlay) audio.play();
    else audio.pause();
  }, [isPlay, isLooped, isMute]);

  return (
    <section
      className="
        w-full
        rounded-3xl
        border border-zinc-200/70 dark:border-zinc-700/60
        bg-white/70 dark:bg-zinc-900/50
        backdrop-blur-xl shadow-lg
        px-5 py-6 sm:px-6
      "
    >
      <div className="mb-4 space-y-1">
        <div className="text-xs uppercase tracking-wide text-zinc-500">
          Now Playing
        </div>
        <div className="truncate text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200">
          {selectedFile?.name || "No file selected"}
        </div>
      </div>

      <div className="space-y-2">
        <Slider
          value={[currentDuration]}
          max={duration || 0}
          step={0.1}
          onValueChange={(v) => {
            audioRef.current!.currentTime = v[0];
            setCurrentDuration(v[0]);
          }}
        />

        <div className="flex justify-between text-[11px] text-zinc-500">
          <span>{fmt(currentDuration)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          onClick={() => setIsMute((m) => !m)}
          className="
            rounded-xl border border-zinc-200 dark:border-zinc-700
            bg-zinc-100 dark:bg-zinc-800
            p-2 transition
            hover:bg-zinc-200 dark:hover:bg-zinc-700
          "
        >
          {isMute ? (
            <VolumeX className="h-4 w-4 text-red-400" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </button>

        <button
          disabled={!selectedFile}
          onClick={() => setPlay((p) => !p)}
          className="
            flex h-14 w-14 items-center justify-center
            rounded-full
            bg-linear-to-br from-indigo-500 to-purple-600
            text-white shadow-lg
            transition active:scale-95 disabled:opacity-50
          "
        >
          {isPlay ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 translate-x-px" />
          )}
        </button>

        <button
          onClick={() => setIsLooped((l) => !l)}
          className={`
            rounded-xl border border-zinc-200 dark:border-zinc-700
            bg-zinc-100 dark:bg-zinc-800
            p-2 transition
            hover:bg-zinc-200 dark:hover:bg-zinc-700
            ${isLooped ? "text-green-400 ring-1 ring-green-400/40" : ""}
          `}
        >
          <Repeat className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};

export default Player;
