import { handler } from "./action";
import { Chat } from "./chat";

export const runtime = "edge";

export default function Page() {
  return <Chat handler={handler} />;
}
