import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@repo/ui/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CV Chat",
  description: "Chat with my CV",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html className="h-full" lang="en">
      <body className={`${inter.className} h-full flex flex-row`}>
        <main className="py-10 w-full md:w-3/5 overflow-auto">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
        <aside className="hidden w-0 md:w-2/5 md:block bg-slate-800 border-l-2">
          <div className="p-6 prose">
            <h2 className="text-sky-300">Full-Stack TypeScript AI Engineer</h2>

            <h3 className="text-gray-100">Technologies & Languages</h3>
            <div className="text-gray-300">
              Figma • HTML • CSS • React • XState • Redux • Tailwind CSS • Shadcn/UI • Headless UI • CSS-in-JS •
              TypeScript • JavaScript • Storybook • Next.js • Remix • React Router • React Testing Library • Zod • Jest
              • Cypress • Playwright • Node JS • Express • NPM • GraphQL • REST API • SOAP • Prisma • Drizzle • Postgres
              • MySQL • MongoDB • AWS • AWS Amplify • AWS Serverless • Lambda • Cognito • Auth.JS • Vercel • Fly.io •
              Docker • CI/CD • GIT • VSCode • Slack • LangChain • AI SDK • Open AI • Hugging Face • SendBird • XMPP •
              Open Fire • JWT • React Native • iOS • Android • Expo • Fastlane • Python • .Net
            </div>

            <h3 className="text-gray-100">Experience</h3>

            <ul className="text-gray-300">
              <li>AI Engineer • Applification</li>
              <li>Full-Stack Engineer • Peppy Health</li>
              <li>Full-Stack Engineer • Pando</li>
              <li>Full-Stack Engineer • Surevine</li>
              <li>Full-Stack Engineer • Vidatec</li>
              <li>Scrum Master • HMRC</li>
            </ul>
          </div>
        </aside>
      </body>
    </html>
  );
}
