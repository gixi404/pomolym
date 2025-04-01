import bellSound from "../sounds/bell.mp3";
import favicon from "/favicon.ico";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";

function playSound(isEnabled: boolean): void {
  if (!isEnabled) return;

  const audio: HTMLAudioElement = new Audio(bellSound);
  audio.load();
  audio.volume = 0.8;
  audio.loop = false;
  audio.muted = false;
  audio.controls = false;
  audio.play();
}

async function showNotificaction(
  isFocusMode: boolean,
  isEnabled: boolean
): Promise<void> {
  if (!isEnabled) return Promise.resolve();

  let hasPermission: boolean = await isPermissionGranted();

  if (!hasPermission) {
    const permission: NotificationPermission = await requestPermission();
    hasPermission = permission == "granted";
  }

  if (hasPermission) {
    sendNotification({
      title: isFocusMode
        ? "The relax time has finished!"
        : "The focus time has finished!",
      icon: favicon,
    });
  }
}

function tryParse(value: string): string {
  try {
    return JSON.parse(value);
  } catch (err: unknown) {
    return value;
  }
}

export { playSound, showNotificaction, tryParse };
