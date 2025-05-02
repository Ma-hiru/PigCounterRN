import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { Text, AppState } from "react-native";

interface props {
  endTime: number;
  format: (time: number) => string;
  endText?: string;
}

const CountDown: FC<props> = ({ endTime, format, endText = "已过期" }) => {
  const [remaining, setRemaining] = useState(endTime - Date.now());
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const appStateRef = useRef(AppState.currentState);
  const update = useCallback(() => {
    const now = Date.now();
    const newRemaining = endTime - now;
    if (newRemaining <= 0) {
      setRemaining(0);
      clearTimeout(timer.current!);
    } else {
      setRemaining(newRemaining);
      timer.current = setTimeout(update, 1000 - (now % 1000));
    }
  }, [endTime]);
  useEffect(() => {
    const subscribe = AppState.addEventListener("change", (currentState) => {
      if (appStateRef.current.match(/inactive|background/) && currentState === "active")
        update();
      appStateRef.current = currentState;
    });
    update();
    return () => {
      clearTimeout(timer.current);
      subscribe.remove();
    };
  }, [endTime, update]);
  const Render = () => {
    if (remaining <= 0) return <Text>{endText}</Text>;
    return <Text>{(format && format(remaining)) || remaining}</Text>;
  };
  return (
    <>
      {Render()}
    </>
  );
};
export default memo(CountDown);
