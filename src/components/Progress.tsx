import useLocalStorage from "../hooks/useLocalStorage";
import { twJoin, twMerge } from "tailwind-merge";
import { useTimer } from "../context/TimerContext";
import type { Component } from "../utils/types";

function Progress(): Component {
  const { timeLeft, isFocusMode } = useTimer();
  const [hiddenTime] = useLocalStorage("hidden-time", false);

  function currentTime(): string {
    if (hiddenTime) return "";

    const minutes: number = Math.floor(timeLeft / 60),
      seconds: number = timeLeft % 60,
      formattedTime: string = `${minutes
        .toString()
        .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;

    return formattedTime;
  }

  return (
    <div className="relative w-64 h-64 flex items-center justify-center lg:pb-8">
      <svg className="bg-transparent rounded-full absolute w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          strokeWidth="3"
          className={twMerge(
            isFocusMode ? "stroke-[#6c2828]" : "stroke-[#3e4194]",
            "fill-transparent transition-colors duration-500"
          )}
        />
      </svg>

      <div
        className={twJoin(
          !hiddenTime && "mt-4",
          "text-center z-10 text-[#EEEEEE] flex flex-col items-center justify-center gap-y-4"
        )}
      >
        <p className={twJoin(hiddenTime && "hidden", "text-5xl")}>
          {currentTime()}
        </p>
        <p
          className={twMerge(
            !hiddenTime ? "text-xl" : "text-3xl",
            "tracking-wider"
          )}
        >
          {isFocusMode ? "focus" : "relax"}
        </p>
      </div>
    </div>
  );
}

export default Progress;
