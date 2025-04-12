import { useWeather } from "@/hooks/useWeather";
import { FC, useMemo, useRef } from "react";

interface props {
  /* empty */
}

const Weather: FC<props> = () => {
  const count = useRef(0);
  // const weatherData = useWeather();
  return (
    <>
    </>
  );
};
export default Weather;
