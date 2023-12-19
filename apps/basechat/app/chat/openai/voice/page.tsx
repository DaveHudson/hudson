export default function ChatVoice() {
  return (
    <article className="prose dark:prose-invert">
      <h1>Chat Voice</h1>
      <ul>
        <li>Capture audio with ReactMediaRecorder</li>
        <li>Upload audio and make OpenAI call to transcribe the audio</li>
        <li>Make open ai call to return speech</li>
        <li>Stream the speech back to the UI</li>
      </ul>
    </article>
  );
}
