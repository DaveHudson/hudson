"use client";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import invariant from "tiny-invariant";

export default function ImageToImage() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [positive, setPositive] = useState("A painting of a cat");
  const [negative, setNegative] = useState("blurry, bad");
  const [style, setStyle] = useState("Anime");
  const [file, setFile] = useState<File>();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    setIsGenerating(true);
    const formData = new FormData(event.currentTarget);
    formData.set("file", file);
    const response = await fetch("/api/image/stability/image-to-image", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setGeneratedImage(data.artifacts[0].base64);
    setIsGenerating(false);
  };

  return (
    <article className="prose dark:prose-invert">
      <h1>Stability.ai Image-to-image</h1>

      <form onSubmit={handleSubmit} className="flex w-full items-center rounded-md pl-1 pr-2 pb-6">
        <div className="flex flex-col w-full space-y-4">
          <div className="col-span-full">
            <label htmlFor="baseimage" className="block text-sm font-medium leading-6 text-gray-900">
              Base image
            </label>
            <div className="mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {file ? (
                  <div className="flex flex-col space-y-0">
                    <img src={URL.createObjectURL(file)} alt="Base image" className="mx-auto rounded-lg w-24 h-auto" />
                    <p className="text-xs leading-5 text-gray-600">{file?.name}</p>
                  </div>
                ) : (
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                )}
                <div className="mt-4 flex items-center text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="baseimage"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2 hover:text-sky-500 "
                  >
                    <span>Upload a file</span>
                    <input
                      id="baseimage"
                      type="file"
                      name="file"
                      onChange={(e) => setFile(e.target.files?.[0])}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>

                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
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
