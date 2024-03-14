"use client";

import * as React from "react";

export function useAtBottom(offset = 0) {
  const [isAtBottom, setIsAtBottom] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.innerHeight + window.scrollY;
      const winHeight = document.body.offsetHeight - offset;

      const isBottom = winScroll >= winHeight;
      setIsAtBottom(isBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  return isAtBottom;
}
