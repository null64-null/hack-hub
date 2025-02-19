"use client";

import { useRef, useEffect } from "react";

export const useScrollByStream = (triggerValue: unknown) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [triggerValue]);

  return { scrollRef };
};
