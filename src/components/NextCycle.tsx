import { CircleIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useTimer } from "../context/TimerContext";
import type { Component } from "../utils/types";

function NextCycle(): Component {
  const { isFocusMode, toggleMode } = useTimer();

  return (
    <div className="flex w-full justify-center items-center mb-4 lg:mb-8">
      <CircleIcon
        onClick={toggleMode}
        size={30}
        className={twMerge(
          isFocusMode
            ? "bg-[#666ad1] text-[#666ad1] hover:bg-[#8a8ddb] hover:text-[#8a8ddb]"
            : "bg-[#9a3f3f] text-[#9a3f3f] hover:bg-[#a85f5f] hover:text-[#a85f5f]",
          "rounded-full cursor-pointer transition-colors duration-500"
        )}
      />
    </div>
  );
}

export default NextCycle;
