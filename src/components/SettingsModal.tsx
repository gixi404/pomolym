import { AlarmClockIcon, XIcon } from "lucide-react";
import { useTimer } from "../context/TimerContext";
import { type FormEvent, useState } from "react";
import type { Component } from "../utils/types";

function SettingsModal({ closeModal }: Props): Component {
  const { updateSettings } = useTimer();
  const [work, setWork] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    updateSettings(work, breakTime);
    closeModal();
  }

  return (
    <div className="fixed flex w-full z-50 backdrop-blur-md h-full items-center justify-center">
      <div className="bg-[#8E1616] p-6 rounded-lg w-72 text-[#EEEEEE]">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-bold flex items-center justify-start gap-x-3">
            <AlarmClockIcon size={20} /> Settings
          </p>
          <XIcon
            size={20}
            onClick={closeModal}
            className="cursor-pointer text-[#EEEEEE] hover:text-[#efa6a6]"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Work Minutes</label>
            <input
              type="number"
              value={work}
              onChange={e => setWork(Number(e.target.value))}
              className="w-full bg-[#1D1616] rounded p-2 text-[#EEEEEE] border border-[#D84040]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Break Minutes</label>
            <input
              type="number"
              value={breakTime}
              onChange={e => setBreakTime(Number(e.target.value))}
              className="w-full bg-[#1D1616] rounded p-2 text-[#EEEEEE] border border-[#D84040]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D84040] text-[#EEEEEE] py-2 rounded hover:bg-[#8E1616] transition-colors"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default SettingsModal;

interface Props {
  closeModal: () => void;
}
