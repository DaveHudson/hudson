import "server-only";

import { createAI } from "ai/rsc";
import { submitCVMatch } from "./actions/submitCVMatch";
import { submitCoverLetter } from "./actions/submitCoverLetter";
import { submitCVChat } from "./actions/submitCVChat";

const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  display: React.ReactNode;
  sources: React.ReactNode;
  // system: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submitCVChat,
    submitCVMatch,
    submitCoverLetter,
  },
  initialUIState,
  initialAIState,
});
