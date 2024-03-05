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
    rootMargin: "0px 0px 0px 0px",
    threshold: 0,
  });

  React.useEffect(() => {
    if (isAtBottom && trackVisibility && !inView) {
      entry?.target.scrollIntoView({
        block: "start",
      });
    }
  }, [inView, entry, trackVisibility, isAtBottom]);

  return (
    <div className="flex flex-col justify-end">
      <div className="h-60">&nbsp;</div>
      <div ref={ref} className="h-px w-full" />
    </div>
  );
}
