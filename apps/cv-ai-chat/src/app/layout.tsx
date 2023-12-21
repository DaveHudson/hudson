import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Ratios from "@repo/ui/ratios";
import RoleSummary from "@repo/ui/role-summary";
import Divider from "@repo/ui/divider";
import "@repo/ui/styles.css";
import "./globals.css";
import {
  AIEngineerRatios,
  EntForumRatios,
  HMRCRatios,
  PandoAccessRatios,
  PandoAdminRatios,
  PeppyRatios,
  SurevineCommsRatios,
  SurevineHQRatios,
  SurevineMODRatios,
  SurevineVideoRatios,
  VidatecBritishArmyRatios,
  VidatecTUIRatios,
  VidatecVirginRatios,
} from "./utils/cv-ratios";

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
        <aside className="hidden w-0 md:w-2/5 md:block bg-slate-800 border-l-2 overflow-auto">
          <div className="p-6 pr-0 prose">
            <h2 className="text-sky-300">Full-Stack TypeScript AI Engineer</h2>

            <Divider text="Experience" />
            <h3 className="prose-em text-gray-300 mt-0 mb-0">AI Engineer • Applification</h3>
            <RoleSummary text="Open-source AI Engineer" />
            <Ratios ratios={AIEngineerRatios} />

            <h3 className="prose-em text-gray-300 mb-0 mt-4">Full-Stack Engineer • Peppy Health</h3>
            <RoleSummary text="Transformed architecture of complex brownfield web app with zero tests &amp; outdated design patterns, supporting practitioners to aid growth of Peppy to £12m ARR" />
            <Ratios ratios={PeppyRatios} />

            <h3 className="prose-em text-gray-300 mb-0 mt-4">Full-Stack Engineer • Pando</h3>
            <h4 className="prose-h4 mt-2 mb-0 text-gray-400">Pando Admin</h4>
            <RoleSummary
              text="Architected, developed and tested web app messaging & management platform used by over 65,000 healthcare
            professionals within the NHS, including low bandwidth MoD clinicians"
            />
            <Ratios ratios={PandoAdminRatios} />
            <h4 className="prose-h4 mt-4 mb-0 text-gray-400">Pando Access</h4>
            <RoleSummary text="Designed &amp; built proof of concept prototype for Pando Access in 4 weeks, across Web, Mobile & API" />
            <Ratios ratios={PandoAccessRatios} />

            <h3 className="prose-em text-gray-300 mb-0 mt-4">Full-Stack Engineer • Surevine</h3>
            <h4 className="prose-h4 mt-2 mb-0 text-gray-400">Web App UK Govt (MoD)</h4>
            <RoleSummary text="Architected, developed and tested a secure web app for the UK MoD" />
            <Ratios ratios={SurevineMODRatios} />
            <h4 className="prose-h4 mt-4 mb-0 text-gray-400">Web App (Cabinet Office)</h4>
            <RoleSummary text="Architected, developed and tested a secure text, audio & video communication-based web app" />
            <Ratios ratios={SurevineVideoRatios} />
            <h4 className="prose-h4 mt-4 mb-0 text-gray-400">Web App (Cabinet Office)</h4>
            <RoleSummary text="Agile delivery of a complex high security cross-domain communication system" />
            <Ratios ratios={SurevineCommsRatios} />
            <h4 className="prose-h4 mt-4 mb-0 text-gray-400">Security Cleared Web App (UK Govt Security)</h4>
            <RoleSummary text="Architected, developed and tested a secure intranet web app for the UK Govt" />
            <Ratios ratios={SurevineHQRatios} />

            <h3 className="prose-em text-gray-300 mb-0 mt-4">Full-Stack Engineer • Vidatec</h3>
            <h4 className="prose-h4 mt-4 mb-0 text-gray-400">Tech Lead British Army (MoD)</h4>
            <RoleSummary
              text="Architected, developed and tested a Progressive Web App to support internal army communications on low bandwidth
            mobile devices"
            />
            <Ratios ratios={VidatecBritishArmyRatios} />
            <h4 className="prose-h4 mt-4 mb-0 text-gray-400">Scrum Master • Virgin Trains</h4>
            <RoleSummary text="Agile delivery of Virgin Trains East Coast Travel Buddy mobile app" />
            <Ratios ratios={VidatecVirginRatios} />
            <h4 className="prose-h4 mt-4 mb-0 text-gray-400">Full-Stack Tech Lead • TUI Travel</h4>
            <RoleSummary
              text="Scoped, architected & led the development of REST APIs and native mobile apps (iOS & Android) for a range of TUI travel
        brands"
            />
            <Ratios ratios={VidatecTUIRatios} />

            <h3 className="prose-h3 mb-0 mt-4 text-gray-300">Full-Stack Engineer • Entrepreneurs’ Forum</h3>
            <RoleSummary text="Scoped, architected, developed &amp; tested an API &amp; native mobile app for the Entrepreneurs’ Forum" />
            <Ratios ratios={EntForumRatios} />

            <h3 className="prose-h3  mt-4 mb-0 text-gray-300">Scrum Master • HMRC</h3>
            <RoleSummary text="Scrum Master of a co-located team of 17, delivering Personal Tax Repayments, Company Car, Medical Benefits & Tax Estimation services" />
            <Ratios ratios={HMRCRatios} />

            <Divider text="Technologies &amp; Languages" />
            <div className="text-gray-300">
              Figma • HTML • CSS • React • XState • Redux • Tailwind CSS • Shadcn/UI • Headless UI • CSS-in-JS •
              TypeScript • JavaScript • Storybook • Next.js • Remix • React Router • React Testing Library • Zod • Jest
              • Cypress • Playwright • Node JS • Express • NPM • GraphQL • REST API • SOAP • Prisma • Drizzle • Postgres
              • MySQL • MongoDB • AWS • AWS Amplify • AWS Serverless • Lambda • Cognito • Auth.JS • Vercel • Fly.io •
              Docker • CI/CD • GIT • VSCode • Slack • LangChain • AI SDK • Open AI • Hugging Face • SendBird • XMPP •
              Open Fire • JWT • React Native • iOS • Android • Expo • Fastlane • Python • .Net
            </div>
          </div>
        </aside>
      </body>
    </html>
  );
}
