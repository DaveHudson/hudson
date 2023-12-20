"use client";

import { useReactMediaRecorder } from "react-media-recorder";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import invariant from "tiny-invariant";
import { Visualizer } from "react-sound-visualizer";
import { Button } from "@repo/ui/base/button";

export default function Chat() {
  const { status, startRecording, stopRecording, mediaBlobUrl, previewAudioStream } = useReactMediaRecorder({
    audio: true,
  });
  const [audioTranslation, setAudioTranslation] = useState<string | null>(null);

  const handleSubmit = async () => {
    invariant(mediaBlobUrl, "mediaBlobUrl is null");
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const audiofile = new File([audioBlob], "audiofile.mp3", {
      type: "audio/mpeg",
    });
    const formData = new FormData();
    formData.append("file", audiofile);
    const res = await fetch("/api/voice/input", {
      method: "POST",
      body: formData,
    });
    const text = await res.text();
    setAudioTranslation(text);
  };
  return (
    <div>
      <div>
        <button onClick={status === "recording" ? stopRecording : startRecording}>
          {(status === "idle" || status === "stopped") && <MicrophoneIcon className="h-6 w-6" aria-hidden="true" />}
          {status === "recording" && (
            <div className="flex">
              <MicrophoneIcon className="h-6 w-6 text-red-700" aria-hidden="true" />
              {previewAudioStream && (
                <Visualizer audio={previewAudioStream} autoStart>
                  {({ canvasRef }) => (
                    <>
                      <canvas ref={canvasRef} width={500} height={30} />
                    </>
                  )}
                </Visualizer>
              )}
            </div>
          )}
          {(status === "acquiring_media" || status === "stopping") && (
            <MicrophoneIcon className="h-6 w-6 text-orange-400" aria-hidden="true" />
          )}
        </button>
        {mediaBlobUrl && <audio src={mediaBlobUrl} controls playsInline hidden />}
      </div>
      <Button onClick={handleSubmit}>Send</Button>
      <div>audioTranslation: {audioTranslation}</div>
    </div>
  );
}
