import { tryParse } from "../utils/helpers";
import { useEffect, useState } from "react";

function useLocalStorage(key: string, defaultValue: any): LocalStorage {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      );
    } catch (err: unknown) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [tryParse(value), setValue];
}

export default useLocalStorage;

type LocalStorage = [value: any, setValue: (value: any) => void];
