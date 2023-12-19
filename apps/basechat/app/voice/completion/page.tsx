"use client";

import { useReactMediaRecorder } from "react-media-recorder";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import invariant from "tiny-invariant";
import { Visualizer } from "react-sound-visualizer";
import { Button } from "@repo/ui/ui/button";

export default function Chat() {
  const { status, startRecording, stopRecording, mediaBlobUrl, previewAudioStream } = useReactMediaRecorder({
    audio: true,
  });
  const [audioURL, setAudioURL] = useState("");

  const handleSubmit = async () => {
    invariant(mediaBlobUrl, "mediaBlobUrl is null");
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const audiofile = new File([audioBlob], "audiofile.mp3", {
      type: "audio/mpeg",
    });
    const formData = new FormData();
    formData.append("file", audiofile);
    const res = await fetch("/api/voice/chat", {
      method: "POST",
      body: formData,
    });

    const blob = new Blob([await res.blob()], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
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
      <div className="flex-1 space-y-8 overflow-y-auto leading-6 sm:text-base sm:leading-7">
        {audioURL && (
          <audio autoPlay controls hidden>
            <source src={audioURL} type="audio/mpeg" />
          </audio>
        )}
      </div>
    </div>
  );
}
