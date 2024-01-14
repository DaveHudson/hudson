// import { handler } from "./action";
import { handler } from "./action-langchain";
import { Chat } from "./chat";

export const runtime = "edge";

export default function Page() {
  return <Chat handler={handler} />;
}
