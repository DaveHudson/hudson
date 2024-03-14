import { AI } from "./action";
import { Chat } from "./chat";

export const runtime = "edge";

export default function Page() {
  return (
    <AI>
      <Chat />
    </AI>
  );
}
