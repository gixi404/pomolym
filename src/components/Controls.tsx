import { PauseIcon, PlayIcon, RotateCwIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useTimer } from "../context/TimerContext";
import type { Component } from "../utils/types";

function Controls(): Component {
  const {
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    isFocusMode,
    isPaused,
  } = useTimer();

  return (
    <div className="flex gap-4 mt-8 [&>button]:outline-0">
      {isRunning ? (
        <button
          type="button"
          onClick={pauseTimer}
          className={twMerge(
            isFocusMode
              ? "bg-[#bc3d3d] hover:bg-[#D84040] border-[#e8646462]"
              : "bg-[#3e4194] hover:bg-[#535596] border-[#6467b85e]",
            "p-2 rounded-full text-[#EEEEEE] w-14 h-14 cursor-pointer flex items-center justify-center border-2 transition-colors duration-500"
          )}
        >
          <PauseIcon size={28} />
        </button>
      ) : (
        <button
          type="button"
          onClick={startTimer}
          className={twMerge(
            isFocusMode
              ? "bg-[#bc3d3d] hover:bg-[#D84040] border-[#e8646462]"
              : "bg-[#3e4194] hover:bg-[#535596] border-[#6467b85e]",
            "p-2 rounded-full text-[#EEEEEE] w-14 h-14 cursor-pointer flex items-center justify-center border-2 transition-colors duration-500"
          )}
        >
          <PlayIcon size={28} />
        </button>
      )}

      <button
        disabled={!isRunning && !isPaused}
        type="button"
        onClick={resetTimer}
        className={twMerge(
          isFocusMode
            ? "bg-[#bc3d3d] hover:bg-[#D84040] disabled:hover:bg-[#bc3d3d] border-[#e8646462]"
            : "bg-[#3e4194] hover:bg-[#535596] border-[#6467b85e] disabled:hover:bg-[#3e4194]",
          "disabled:cursor-default disabled:opacity-50 p-2 rounded-full text-[#EEEEEE] w-14 h-14 cursor-pointer flex items-center justify-center border-2 transition-colors duration-500"
        )}
      >
        <RotateCwIcon size={28} />
      </button>
    </div>
  );
}

export default Controls;
