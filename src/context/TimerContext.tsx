import useLocalStorage from "../hooks/useLocalStorage";
import { playSound, showNotificaction } from "../utils/helpers";
import {
  type Context,
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Component, Interval } from "../utils/types";

export function TimerProvider({ children }: PropsWithChildren): Component {
  const [isRunning, setIsRunning] = useState<boolean>(false),
    [isFocusMode, setIsFocusMode] = useState<boolean>(true),
    [focusMinutes, setFocusMinutes] = useLocalStorage("focus-time", 25),
    [relaxMinutes, setRelaxMinutes] = useLocalStorage("relax-time", 5),
    [timeLeft, setTimeLeft] = useState<number>(focusMinutes * 60),
    [isFinished, setIsFinished] = useState<boolean>(false),
    [isPaused, setIsPaused] = useState<boolean>(false),
    [notifications] = useLocalStorage("notifications", true),
    [sounds] = useLocalStorage("sounds", true),
    toggleMode = (): void => {
      setIsFocusMode(!isFocusMode);
      setTimeLeft((isFocusMode ? relaxMinutes : focusMinutes) * 60);
      setIsRunning(false);
      setIsPaused(true);
    },
    startTimer = (): void => {
      setIsRunning(true);
      setIsPaused(false);
    },
    pauseTimer = (): void => {
      setIsRunning(false);
      setIsPaused(true);
    },
    resetTimer = (): void => {
      setIsRunning(false);
      setIsPaused(false);
      setTimeLeft(isFocusMode ? focusMinutes * 60 : relaxMinutes * 60);
    };

  useEffect(() => {
    if (isFinished) {
      playSound(sounds);
      showNotificaction(isFocusMode, notifications);
      setIsFinished(false);
    }
  }, [isFinished]);

  useEffect(() => {
    if (!isRunning) return;

    const interval: Interval = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsFinished(true);

          if (isFocusMode) {
            setIsRunning(false);
            setIsFocusMode(false);
            setTimeLeft(relaxMinutes * 60);
          } else {
            setIsRunning(false);
            setIsFocusMode(true);
            setTimeLeft(focusMinutes * 60);
          }

          return prev;
        }
        return prev - 1;
      });
    }, 10); //! cambiar a 1000

    return () => clearInterval(interval);
  }, [isRunning, isFocusMode, focusMinutes, relaxMinutes]);

  function updateSettings(focusTime: number, relaxTime: number): void {
    setFocusMinutes(focusTime);
    setRelaxMinutes(relaxTime);
    setTimeLeft(focusTime * 60);
  }

  return (
    <TimerCtx.Provider
      value={{
        timeLeft,
        isRunning,
        isFocusMode,
        focusMinutes,
        relaxMinutes,
        startTimer,
        pauseTimer,
        resetTimer,
        updateSettings,
        isPaused,
        toggleMode,
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
  isFocusMode: boolean;
  focusMinutes: number;
  relaxMinutes: number;
  isPaused: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  toggleMode: () => void;
  updateSettings: (focusTime: number, relaxTime: number) => void;
}
