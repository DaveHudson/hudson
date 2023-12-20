import { extractYouTubeEmbed } from "../utils/extractYouTubeEmbed";

export const RenderVideo = ({ content }: { content: any }) => {
  const iframe = extractYouTubeEmbed(content);

  // If a YouTube iframe is found, return it. Otherwise, return null.
  return iframe ? <div className="prose" dangerouslySetInnerHTML={{ __html: iframe }} /> : null;
};
