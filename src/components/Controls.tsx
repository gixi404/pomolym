import { PauseIcon, PlayIcon, RotateCwIcon } from "lucide-react";
import { useTimer } from "../context/TimerContext";
import type { Component } from "../utils/types";

function Controls(): Component {
  const { isRunning, startTimer, pauseTimer, resetTimer } = useTimer();

  return (
    <div className="flex gap-4 mt-8">
      {isRunning ? (
        <button
          type="button"
          onClick={pauseTimer}
          className="p-3 rounded-full bg-[#D84040] hover:bg-[#8E1616] transition-colors text-[#EEEEEE]"
        >
          <PauseIcon size={24} />
        </button>
      ) : (
        <button
          type="button"
          onClick={startTimer}
          className="p-3 rounded-full bg-[#D84040] hover:bg-[#8E1616] transition-colors text-[#EEEEEE]"
        >
          <PlayIcon size={24} />
        </button>
      )}
      <button
        type="button"
        onClick={resetTimer}
        className="p-3 rounded-full bg-[#8E1616] hover:bg-[#D84040] transition-colors text-[#EEEEEE]"
      >
        <RotateCwIcon size={24} />
      </button>
    </div>
  );
}

export default Controls;
