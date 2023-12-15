export const extractYouTubeEmbed = (content: string) => {
  // Regular expression to find YouTube iframe
  const regex =
    /<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/[^"]*"[^>]*title="YouTube video player"[^>]*><\/iframe>/;
  const match = content.match(regex);

  // If a YouTube iframe is found, return it. Otherwise, return null.
  return match ? match[0] : null;
};
