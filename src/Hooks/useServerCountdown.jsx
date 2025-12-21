import { useEffect, useRef, useState } from "react";

const useServerCountdown = (departureDateTime, serverTime) => {
    const startRef = useRef(Date.now());
  const [text, setText] = useState("");
  const [expired, setExpired] = useState(false);

  

  useEffect(() => {
    if (!departureDateTime || !serverTime) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startRef.current;

      const diff =
        new Date(departureDateTime) -
        new Date(serverTime) -
        elapsed;

      if (diff <= 0) {
        setExpired(true);
        setText("Departure passed");
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setText(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [departureDateTime, serverTime]);

  return { text, expired };
};

export default useServerCountdown;
