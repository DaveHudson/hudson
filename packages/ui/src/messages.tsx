"use client";

import { useEffect, useRef } from "react";
import type { Message } from "ai/react";
import MessageAI from "./message-ai";
import MessageUser from "./message-user";

export default function Messages({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="ui-flex-1 ui-space-y-8 ui-overflow-y-auto ui-leading-6 sm:ui-text-base sm:ui-leading-7">
      {messages.map((message, index) => (
        <div key={message.id}>
          {message.role === "user" ? (
            <MessageUser>{message.content}</MessageUser>
          ) : (
            <MessageAI>{message.content}</MessageAI>
          )}
          {index === messages.length - 1 ? <div ref={messagesEndRef} /> : null}
        </div>
      ))}
    </div>
  );
}
