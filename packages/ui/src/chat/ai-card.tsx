"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import clsx from "clsx";

export function AICard({ children, done }: { children: string | JSX.Element; done?: boolean }): JSX.Element {
  return (
    <div
      className={clsx(
        "ui-rounded-lg",
        "ui-p-2",
        "ui-p-2",
        "ui-text-sm",
        "ui-text-muted-foreground",
        "ui-overflow-hidden",
        !done ? "ui-border ui-border-slate-200 ui-shadow-sm" : "ui-pl-0"
      )}
    >
      <div className="ui-flex ui-space-x-2">
        {!done ? (
          <div className="ui-flex ui-justify-center ui-items-center">
            <motion.div
              initial={{ scale: 1.0 }}
              animate={{ scale: 0.8 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
            >
              <Sparkles className="ui-h-5 ui-stroke-purple-600" />
            </motion.div>
          </div>
        ) : null}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className="ui-flex ui-justify-center ui-items-center"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
