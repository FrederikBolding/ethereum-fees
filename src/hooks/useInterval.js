import { useEffect, useRef } from "react";

export function useInterval(callback, delay, immediate, trigger) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (!savedCallback.current) return;
      savedCallback.current();
    }

    // Trigger the interval immediately
    if (immediate) tick();

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay, ...trigger]);
}
