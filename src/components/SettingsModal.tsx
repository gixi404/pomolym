import useLocalStorage from "../hooks/useLocalStorage";
import { CheckSquare2Icon, HeartIcon, SquareIcon, XIcon } from "lucide-react";
import { useTimer } from "../context/TimerContext";
import { type SyntheticEvent, useEffect } from "react";
import type { Component, InputChange } from "../utils/types";

function SettingsModal({ closeModal }: Props): Component {
  const { updateSettings } = useTimer(),
    [focusTime, setFocusTime] = useLocalStorage("focus-time", 25),
    [relaxTime, setRelaxTime] = useLocalStorage("relax-time", 5),
    [hiddenTime, setHiddenTime] = useLocalStorage("hidden-time", false),
    [notifications, setNotifications] = useLocalStorage("notifications", true),
    [sounds, setSounds] = useLocalStorage("sounds", true);

  useEffect(() => {
    updateSettings(focusTime, relaxTime);
  }, [focusTime, relaxTime]);

  function handleInput(e: InputChange, isFocus: boolean): void {
    const setState = isFocus ? setFocusTime : setRelaxTime;
    const val: string = e.target.value;
    if (/^\d*$/.test(val)) {
      if (val == "") return setState(0);
      const numericVal: number = Number(val);
      if (numericVal >= 1 && numericVal <= 999) return setState(numericVal);
    }
  }

  return (
    <section
      onClick={closeModal}
      className="fixed flex flex-col w-full gap-y-6 z-50 bg-[#1D1616] h-full items-center justify-center"
    >
      <div
        onClick={(e: SyntheticEvent) => e.stopPropagation()}
        className="bg-[#8E1616] p-6 rounded-lg w-70 text-[#EEEEEE]"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-bold">Settings</p>
          <XIcon
            size={24}
            onClick={closeModal}
            strokeWidth={2.5}
            className="cursor-pointer text-[#EEEEEE] hover:text-[#efa6a6]"
          />
        </div>

        <form className="[&>label>input]:outline-0 flex flex-col w-full justify-start items-center gap-y-3 [&>label]:text-sm">
          <label>
            Focus minutes
            <input
              id="focus-input"
              type="text"
              className="mt-1 w-full bg-[#1D1616] rounded p-2 text-[#EEEEEE] border border-[#D84040]"
              pattern="\d*"
              max={999}
              min={1}
              onChange={(e: InputChange) => handleInput(e, true)}
              value={focusTime == 0 ? "" : focusTime}
              onBlur={() => focusTime == 0 && setFocusTime(25)}
            />
          </label>

          <label>
            Relax minutes
            <input
              id="relax-input"
              type="text"
              pattern="\d*"
              className="mt-1 w-full bg-[#1D1616] rounded p-2 text-[#EEEEEE] border border-[#D84040]"
              max={999}
              min={1}
              value={relaxTime == 0 ? "" : relaxTime}
              onChange={(e: InputChange) => handleInput(e, false)}
              onBlur={() => relaxTime == 0 && setRelaxTime(5)}
            />
          </label>

          <label className="flex items-center justify-between w-full mt-2 mb-1">
            <p>Sounds</p>
            {sounds ? (
              <CheckSquare2Icon
                size={22}
                onClick={() => {
                  setSounds(false);
                  location.reload();
                }}
              />
            ) : (
              <SquareIcon
                size={22}
                onClick={() => {
                  setSounds(true);
                  location.reload();
                }}
              />
            )}
          </label>

          <label className="flex items-center justify-between w-full my-1">
            <p>Notifications</p>
            {notifications ? (
              <CheckSquare2Icon
                size={22}
                onClick={() => {
                  setNotifications(false);
                  location.reload();
                }}
              />
            ) : (
              <SquareIcon
                size={22}
                onClick={() => {
                  setNotifications(true);
                  location.reload();
                }}
              />
            )}
          </label>

          <label className="flex items-center justify-between w-full my-1">
            <p>Hidden time</p>
            {hiddenTime ? (
              <CheckSquare2Icon
                size={22}
                onClick={() => {
                  setHiddenTime(false);
                  location.reload();
                }}
              />
            ) : (
              <SquareIcon
                size={22}
                onClick={() => {
                  setHiddenTime(true);
                  location.reload();
                }}
              />
            )}
          </label>
        </form>
      </div>
      <footer className="text-sm lg:text-[15px] w-full text-center text-[#b2b2b2] flex justify-center items-center gap-x-1.5">
        Developed with
        <HeartIcon color="#ff8f8f" size={14} className="mt-1" />
        by
        <a
          className="duration-75 hover:underline hover:text-white"
          href="https://gixi.dev"
          target="_blank"
          rel="noreferrer"
        >
          gixi.dev
        </a>
      </footer>
    </section>
  );
}

export default SettingsModal;

interface Props {
  closeModal: () => void;
}
