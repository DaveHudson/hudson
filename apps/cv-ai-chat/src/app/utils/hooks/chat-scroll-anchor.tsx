"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";
import { useAtBottom } from "./use-at-bottom";

interface ChatScrollAnchorProps {
  trackVisibility?: boolean;
}

export function ChatScrollAnchor({ trackVisibility }: ChatScrollAnchorProps) {
  const isAtBottom = useAtBottom();
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: "0px 0px -150px 0px",
    threshold: 0,
  });

  const [isMoving, setIsMoving] = React.useState(false);
  let timerId: NodeJS.Timeout;

  const handleMouseMove = () => {
    if (!isMoving) setIsMoving(true);
    clearTimeout(timerId);
    timerId = setTimeout(() => setIsMoving(false), 100); // 1 second of inactivity
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleMouseMove);
    };
  }, []);

  React.useEffect(() => {
    if (isAtBottom && trackVisibility && !inView && !isMoving) {
      entry?.target.scrollIntoView({
        block: "start",
      });
    }
  }, [inView, entry, trackVisibility, isAtBottom]);

  return (
    <div ref={ref} className="h-[240px] w-full">
      {/* <div>{`Header inside viewport ${inView}. isAtBottom: ${isAtBottom} isMoving: ${isMoving}`}</div> */}
    </div>
  );
}
