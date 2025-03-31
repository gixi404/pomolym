import {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Component, Interval } from "../utils/types";

export function TimerProvider({ children }: PropsWithChildren): Component {
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60),
    [isRunning, setIsRunning] = useState<boolean>(false),
    [isWorkMode, setIsWorkMode] = useState<boolean>(true),
    [workMinutes, setWorkMinutes] = useState<number>(25),
    [breakMinutes, setBreakMinutes] = useState<number>(5),
    startTimer = (): void => setIsRunning(true),
    pauseTimer = (): void => setIsRunning(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval: Interval = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsWorkMode((prevMode: boolean) => !prevMode);
          return isWorkMode ? breakMinutes * 60 : workMinutes * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isWorkMode, workMinutes, breakMinutes]);

  function resetTimer(): void {
    setIsRunning(false);
    setTimeLeft(isWorkMode ? workMinutes * 60 : breakMinutes * 60);
  }

  function updateSettings(work: number, breakTime: number): void {
    setWorkMinutes(work);
    setBreakMinutes(breakTime);
    setTimeLeft(work * 60);
  }

  return (
    <TimerCtx.Provider
      value={{
        timeLeft,
        isRunning,
        isWorkMode,
        workMinutes,
        breakMinutes,
        startTimer,
        pauseTimer,
        resetTimer,
        updateSettings,
      }}
    >
      {children}
    </TimerCtx.Provider>
  );
}

const TimerCtx: Context<TimerContext> = createContext<TimerContext>(undefined);

export function useTimer(): TimerContextType {
  const ctx: TimerContext = useContext(TimerCtx);

  if (!ctx) {
    throw new Error("Error obteniendo 'TimerContext'");
  }

  return ctx;
}

type TimerContext = TimerContextType | undefined;

interface TimerContextType {
  timeLeft: number;
  isRunning: boolean;
  isWorkMode: boolean;
  workMinutes: number;
  breakMinutes: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  updateSettings: (work: number, breakTime: number) => void;
}
