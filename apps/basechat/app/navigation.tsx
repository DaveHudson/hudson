"use client";
import { useEffect, useState } from "react";
import {
  CommandLineIcon,
  FilmIcon,
  HomeIcon,
  PhotoIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CameraIcon,
  PencilSquareIcon,
  ArrowsRightLeftIcon,
  ChatBubbleBottomCenterTextIcon,
  SpeakerWaveIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

import NavigationDesktop from "@repo/ui/nav/nav-desktop";
import NavigationMobile from "@repo/ui/nav/nav-mobile";
import Header from "@repo/ui/nav/header";

export type NavigationItem = {
  name: string;
  href: string;
  subNav?: boolean;
  icon: any;
  current: boolean;
};

export default function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon, current: pathname === "/" },
    // { name: "AI Prompts", href: "/prompts", icon: CommandLineIcon, current: pathname === "/prompts" },
    {
      name: "Chat",
      href: "/chat",
      icon: ChatBubbleLeftRightIcon,
      current: pathname === "/chat",
    },
    {
      name: "Chat GPT (Text)",
      href: "/chat/openai/chatgpt",
      subNav: true,
      icon: ChatBubbleBottomCenterTextIcon,
      current: pathname === "/chat/openai/chatgpt",
    },
    // {
    //   name: "Chat GPT (Voice)",
    //   href: "/chat/openai/voice",
    //   subNav: true,
    //   icon: SpeakerWaveIcon,
    //   current: pathname === "/chat/openai/voice",
    // },
    // {
    //   name: "Chat GPT (RAG)",
    //   href: "/chat/openai/rag",
    //   subNav: true,
    //   icon: DocumentPlusIcon,
    //   current: pathname === "/chat/openai/rag",
    // },
    {
      name: "Claude",
      href: "/chat/anthropic/claude",
      subNav: true,
      icon: UsersIcon,
      current: pathname === "/chat/anthropic/claude",
    },
    // {
    //   name: "Ollama (Llama2)",
    //   href: "/chat/ollama/llama2",
    //   subNav: true,
    //   icon: UsersIcon,
    //   current: pathname === "/chat/ollama/llama2",
    // },
    {
      name: "Completion",
      href: "/completion",
      icon: DocumentTextIcon,
      current: pathname === "/completion",
    },
    {
      name: "Cohere",
      href: "/completion/cohere",
      subNav: true,
      icon: ArrowsRightLeftIcon,
      current: pathname === "/completion/cohere",
    },
    {
      name: "Hugging Face (Translate)",
      href: "/completion/huggingface/translation",
      subNav: true,
      icon: ArrowsRightLeftIcon,
      current: pathname === "/completion/huggingface/translation",
    },
    {
      name: "Prompt Hub",
      href: "/completion/prompthub",
      subNav: true,
      icon: ArrowsRightLeftIcon,
      current: pathname === "/completion/prompthub",
    },
    {
      name: "Voice",
      href: "/voice/completion",
      subNav: true,
      icon: SpeakerWaveIcon,
      current: pathname === "/voice/completion",
    },
    {
      name: "Image",
      href: "/image",
      icon: PhotoIcon,
      current: pathname === "/image",
    },
    {
      name: "Text To Image",
      href: "/image/stability/text-to-image",
      subNav: true,
      icon: PencilSquareIcon,
      current: pathname === "/image/stability/text-to-image",
    },
    {
      name: "Image To Image",
      href: "/image/stability/image-to-image",
      icon: CameraIcon,
      subNav: true,
      current: pathname === "/image/stability/image-to-image",
    },
    // {
    //   name: "Video",
    //   href: "/video",
    //   icon: FilmIcon,
    //   current: pathname === "/video",
    // },
  ];

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <div>
        <NavigationDesktop navigation={navigation} />
        <NavigationMobile navigation={navigation} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="lg:pl-72">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
