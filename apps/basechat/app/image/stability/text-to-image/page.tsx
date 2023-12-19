"use client";
import { useState } from "react";

export default function TextToImage() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [positive, setPositive] = useState("A painting of a cat");
  const [negative, setNegative] = useState("blurry, bad");
  const [style, setStyle] = useState("Anime");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGenerating(true);
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/image/stability/text-to-image", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setGeneratedImage(data.artifacts[0].base64);
    setIsGenerating(false);
  };

  return (
    <article className="prose dark:prose-invert">
      <h1>Stability.ai Text-to-image</h1>

      <form onSubmit={handleSubmit} className="flex w-full items-center rounded-md pl-1 pr-2 pb-6">
        <div className="flex flex-col w-full space-y-4">
          <div>
            <label htmlFor="positive" className="block text-sm font-medium leading-6">
              Positive
            </label>
            <div className="mt-2">
              <textarea
                rows={4}
                name="positive"
                id="positive"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                placeholder="Positive"
                value={positive}
                onChange={(e) => setPositive(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="negative" className="block text-sm font-medium leading-6">
              Negative
            </label>
            <div className="mt-2">
              <textarea
                rows={4}
                name="negative"
                id="negative"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                placeholder="Negative"
                value={negative}
                onChange={(e) => setNegative(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="style_preset" className="block text-sm font-medium leading-6 text-gray-900">
              Style Preset
            </label>
            <select
              id="style_preset"
              name="style_preset"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="anime">Anime</option>
              <option value="enhance">Enhance</option>
              <option value="photographic">Photographic</option>
              <option value="digital-art">Digital Art</option>
              <option value="comic-book">Comic Book</option>
              <option value="fantasy-art">Fantasy Art</option>
              <option value="line-art">Line Art</option>
              <option value="analog-film">Analog Film</option>
              <option value="neon-punk">Neon Punk</option>
              <option value="isometric">Isometric</option>
              <option value="low-poly">Low Poly</option>
              <option value="origami">Origami</option>
              <option value="modelling-compound">Modelling Compound</option>
              <option value="cinematic">Cinematic</option>
              <option value="3d-model">3D Model</option>
              <option value="pixel-art">Pixel Art</option>
              <option value="tile-texture">Tile Texture</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="rounded-md bg-sky-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              disabled={isGenerating}
            >
              Generate
            </button>
          </div>
        </div>
      </form>
      {isGenerating && <p>Generating...</p>}
      {generatedImage && (
        <img src={`data:image/jpeg;base64,${generatedImage}`} alt="Generated Image" className="rounded-lg" />
      )}
    </article>
  );
}
