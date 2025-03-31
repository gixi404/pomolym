import catGif from "../assets/cat.gif";
import { useTimer } from "../context/TimerContext";
import type { Component } from "../utils/types";

function CircleProgress(): Component {
  const { timeLeft, isWorkMode } = useTimer();
  const minutes: number = Math.floor(timeLeft / 60);
  const seconds: number = timeLeft % 60;

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <svg className="bg-[#8E1616] rounded-full absolute w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          className="fill-transparent stroke-[#fd3a3a]"
          strokeWidth="3"
        />
      </svg>

      <div className="text-center z-10 text-[#EEEEEE]">
        <p className="text-5xl font-bold">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </p>
        <div className="flex justify-center items-center">
          <img src={catGif} alt="Cat gif" width={100} height={100} />
        </div>
        <p className="text-lg uppercase">{isWorkMode ? "Focus" : "Relax"}</p>
      </div>
    </div>
  );
}

export default CircleProgress;
