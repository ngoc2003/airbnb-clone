import { useEffect, useRef, useState } from "react";

export const useInfinityScroll = (canScroll: boolean) => {
  const scrollRef = useRef<HTMLElement | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        canScroll &&
        scrollRef.current &&
        window.innerHeight + window.scrollY >=
          scrollRef.current.offsetTop + scrollRef.current.offsetHeight - 50 &&
        !isFetching
      ) {
        setIsFetching(true);

        setTimeout(() => {
          setIsFetching(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [canScroll, isFetching]);

  return { scrollRef, isFetching };
};
