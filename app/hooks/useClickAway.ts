import { useEffect, useRef, useCallback } from "react";

const useClickAway = (func: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickAway = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        func();
      }
    },
    [func]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickAway);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [handleClickAway]);

  return ref;
};

export { useClickAway };
