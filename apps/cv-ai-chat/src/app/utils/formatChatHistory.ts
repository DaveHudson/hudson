import type { Message } from "ai";

export const formatChatHistory = (chatHistory: [string, string][]) => {
  const formattedDialogueTurns = chatHistory.map(
    (dialogueTurn) => `Human: ${dialogueTurn[0]}\nAssistant: ${dialogueTurn[1]}`
  );
  return formattedDialogueTurns.join("\n");
};

export const formatAIChatHistory = (chatHistory: Message[]) => {
  if (chatHistory) {
    const formattedDialogueTurns = chatHistory.map(
      (dialogueTurn) => `${dialogueTurn.role}:: ${dialogueTurn.content}\n`
    );
    return formattedDialogueTurns.join("\n");
  } else {
    return "";
  }
};
