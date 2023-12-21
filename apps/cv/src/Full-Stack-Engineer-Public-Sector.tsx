import Ratios from "./components/ratios";
import RoleSummary from "./components/role-summary";
import {
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
} from "./utils/ratios";

function FullStackEngineerPublicSector() {
  return (
    <div className="flex flex-col prose min-w-full pt-8">
      <div className="flex flex-col mx-auto text-left max-w-4xl">
        <h1 className="prose-h1 text-center">Full-Stack TypeScript Engineer</h1>
        <article>
          <div className="prose-lead text-center">
            Dave Hudson • <a href="mailto:dave@applification.net">dave@applification.net</a> • UK
          </div>
          <div className="text-center">
            <a href="https://github.com/DaveHudson" target="_blank">
              Github
            </a>{" "}
            •{" "}
            <a href="https://www.linkedin.com/in/hudsond/" target="_blank">
              LinkedIn
            </a>{" "}
            •{" "}
            <a href="https://applification.net" target="_blank">
              Blog
            </a>
          </div>
        </article>

        {/* SELECT ACHIEVEMENTS */}
        <h2 className="prose-h2 mt-4 mb-0">Select Achievements</h2>
        <ul className="prose-ul mt-0 mb-0 leading-6">
          <li>
            Delivered team agile transformation at HMRC whilst assisting the delivery of a service that returned £1
            billion tax, saving HMRC £4.5 million and serving 1.7 million users
          </li>
          <li>Led development of security-focused web apps & collaboration solutions for the UK Govt.</li>
          <li>
            Full-Stack Engineer in multiple early stage HealthTech start-ups. Supporting NHS staff during Pandemic &amp;
            women going through the Menopause
          </li>
        </ul>

        {/* TECHNOLOGIES & LANGUAGES */}
        <h2 className="prose-h2 mt-4 mb-0">Technologies & Languages</h2>
        <div className="border-l-4 ml-2 pl-4">
          Figma • HTML • CSS • React • XState • Redux • Tailwind CSS • Shadcn/UI • Headless UI • CSS-in-JS • TypeScript
          • JavaScript • Storybook • Next.js • Remix • React Router • React Testing Library • Zod • Jest • Cypress •
          Playwright • Node JS • Express • NPM • GraphQL • REST API • SOAP • Prisma • Drizzle • Postgres • MySQL •
          MongoDB • AWS • AWS Amplify • AWS Serverless • Lambda • Cognito • Auth.JS • Vercel • Fly.io • Docker • CI/CD •
          GIT • VSCode • Slack • LangChain • AI SDK • Open AI • Hugging Face • SendBird • XMPP • Open Fire • JWT • React
          Native • iOS • Android • Expo • Fastlane • Python • .Net
        </div>

        {/* EXPERIENCE */}
        <h2 className="prose-h2 mt-4 mb-0">Experience</h2>

        {/* PEPPY HEALTH */}
        <h3 className="prose-h3 mt-2 mb-0">
          Full-Stack Engineer •{" "}
          <a href="https://peppy.health" target="_blank">
            Peppy Health
          </a>
        </h3>
        <p className="prose-em mb-0">HealthTech • Contract Remote, London • Mar 2022 - Oct 2023</p>
        <RoleSummary text="Transformed architecture of complex brownfield web app with zero tests &amp; outdated design patterns, supporting practitioners to aid growth of Peppy to £12m ARR" />
        <Ratios ratios={PeppyRatios} />
        <ul className="prose-ul mt-0 mb-0 leading-6">
          <li>Simplified React component composition &amp; led change to Component Driven Development</li>
          <li>
            Created a design system of UI components with Tailwind in Storybook, tested with Cypress Component Tests
          </li>
          <li>
            Fixed React re-rendering with fresh approach to application state management, leaning on URL state of React
            Router and data browser
          </li>
          <li>Created e2e test coverage via Cypress and configured to run in GitHub C.I</li>
          <li>Aided integration of Peppy web app with Peppy AI API (LangChain & OpenAI)</li>
        </ul>

        {/* PANDO */}
        <h3 className="prose-h3 mt-2 mb-0">
          Full-Stack Engineer •{" "}
          <a href="https://hellopando.com" target="_blank">
            Pando
          </a>
        </h3>
        <p className="prose-em mb-0">HealthTech • Contract Remote, London • Jan 2021 - Dec 2021</p>
        <h4 className="prose-h4 mt-2 mb-0">Pando Admin</h4>
        <span>
          <a href="https://app.hellopando.com/" target="_blank">
            https://app.hellopando.com/
          </a>{" "}
          •{" "}
          <a href="https://apps.apple.com/gb/app/pando/id1211209730" target="_blank">
            iOS app
          </a>{" "}
          •{" "}
          <a href="https://play.google.com/store/apps/details?id=uk.co.forwardapp&hl=en" target="_blank">
            Android app
          </a>
        </span>
        <RoleSummary
          text="Architected, developed and tested web app messaging & management platform used by over 65,000 healthcare
            professionals within the NHS, including low bandwidth MoD clinicians"
        />
        <Ratios ratios={PandoAdminRatios} />
        <ul>
          <li>Fixed slow application performance &amp; rendering issues</li>
          <li>
            Implemented Component Driven Development approach &amp;{" "}
            <a href="https://dev-storybook.hellopando.com" target="_blank">
              design system of UI components in Storybook
            </a>
          </li>
          <li>Created e2e test coverage via Cypress and configured to run in GitHub C.I</li>
        </ul>
        <h4 className="prose-h4 mt-2 mb-0">Pando Access</h4>
        <RoleSummary text="Designed &amp; built proof of concept prototype for Pando Access in 4 weeks, across Web, Mobile & API" />
        <Ratios ratios={PandoAccessRatios} />
        <ul>
          <li>
            Built Pando Design System •{" "}
            <a href="https://osuikit.netlify.app" target="_blank">
              https://osuikit.netlify.app
            </a>
          </li>
          <li>Architected front-end of Pando Access product</li>
          <li>Built web app wrapper in React Native to render Pando Access across iOS &amp; Android</li>
        </ul>

        {/* SUREVINE */}
        <h3 className="prose-h3 mt-2 mb-0">
          Full-Stack Engineer •{" "}
          <a href="https://surevine.com/" target="_blank">
            Surevine
          </a>
        </h3>
        <p className="prose-em mb-0">CyberTech • Contract Remote, London • May 2018 - Feb 2020</p>
        <h4 className="prose-h4 mt-2 mb-0">Web App UK Govt (MoD)</h4>
        <RoleSummary text="Architected, developed and tested a secure web app for the UK MoD" />
        <Ratios ratios={SurevineMODRatios} />
        <p>React • XState • Storybook • JSON Schema • Cypress • AWA Serverless • Lambda • Cognito</p>
        <h4 className="prose-h4 mt-2 mb-0">Web App (Cabinet Office)</h4>
        <RoleSummary text="Architected, developed and tested a secure text, audio & video communication-based web app" />
        <Ratios ratios={SurevineVideoRatios} />
        <p>React • Redux • REST API • Storybook • React JSON Schema Form</p>
        <h4 className="prose-h4 mt-2 mb-0">Web App (Cabinet Office)</h4>
        <RoleSummary text="Agile delivery of a complex high security cross-domain communication system" />
        <Ratios ratios={SurevineCommsRatios} />
        <p>
          Managed stakeholders, ran retrospectives, planning sessions and daily scrum ceremonies for a team delivering a
          complex security-focused cross-domain system
        </p>
        <h4 className="prose-h4 mt-2 mb-0">Security Cleared Web App (UK Govt Security)</h4>
        <RoleSummary text="Architected, developed and tested a secure intranet web app for the UK Govt" />
        <Ratios ratios={SurevineHQRatios} />
        <p>React • Redux • REST API • Jest • Storybook • Docker</p>

        {/* VIDATEC */}
        <h3 className="prose-h3 mt-2 mb-0">
          Full-Stack Engineer •{" "}
          <a href="https://vidatec.com/" target="_blank">
            Vidatec
          </a>
        </h3>
        <p className="prose-em mb-0">TravelTech • Multiple Contracts Remote, Edinburgh • Oct 2013 - Apr 2018</p>
        <h4 className="prose-h4 mt-2 mb-0">Tech Lead British Army (MoD)</h4>
        <RoleSummary
          text="Architected, developed and tested a Progressive Web App to support internal army communications on low bandwidth
            mobile devices"
        />
        <Ratios ratios={VidatecBritishArmyRatios} />
        <p>Preact • GraphQL • Workbox • WebPush • Microsoft Sharepoint</p>
        <h4 className="prose-h4 mt-2 mb-0">
          Scrum Master •{" "}
          <a href="https://virgintrainsticketing.com/" target="_blank">
            Virgin Trains
          </a>
        </h4>
        <RoleSummary text="Agile delivery of Virgin Trains East Coast Travel Buddy mobile app" />
        <Ratios ratios={VidatecVirginRatios} />
        <ul>
          <li>Scrum Master for Virgin Trains East Coast Travel Buddy mobile app</li>
          <li>Facilitated daily scrum meetings, sprint planning, review & retrospectives</li>
          <li>Introduced User Story Mapping to visualise the service & provide the context of user stories</li>
          <li>Worked to build & refine backlog to be in line with business needs and expectations</li>
        </ul>
        <h4 className="prose-h4 mt-2 mb-0">
          Full-Stack Tech Lead •{" "}
          <a href="https://www.tui.co.uk/" target="_blank">
            TUI Travel
          </a>
        </h4>
        <RoleSummary
          text="Scoped, architected & led the development of REST APIs and native mobile apps (iOS & Android) for a range of TUI travel
        brands"
        />
        <Ratios ratios={VidatecTUIRatios} />
        <ul>
          <li>
            Senior Developer,{" "}
            <a href="https://www.chubb.com" target="_blank">
              Chubb Travel
            </a>{" "}
            Companion Mobile App
          </li>
          <li>
            Lead Developer & Scrum Master,{" "}
            <a href="https://www.intrepidtravel.com/uk" target="_blank">
              Intrepid Travel
            </a>{" "}
            Mobile App
          </li>
          <li>Tech Lead & Scrum Master, TUI India Mobile App</li>
          <li>
            Senior Developer,{" "}
            <a href="https://www.leboat.co.uk/" target="_blank">
              Le Boat
            </a>{" "}
            Mobile App
          </li>
          <li>Lead Developer, Thomson ViewMaker Mobile App</li>
        </ul>

        {/* ENTREPRENEURS FORUM */}
        <h3 className="prose-h3 mt-2 mb-0 ">
          Full-Stack Engineer •{" "}
          <a href="https://entrepreneursforum.net/" target="_blank">
            Entrepreneurs’ Forum
          </a>
        </h3>
        <p className="prose-em mb-0">Contract Remote, Newcastle • May 2017 - Sept 2017</p>
        <RoleSummary text="Scoped, architected, developed &amp; tested an API &amp; native mobile app for the Entrepreneurs’ Forum" />
        <Ratios ratios={EntForumRatios} />
        <ul>
          <li>Developed native mobile apps for iOS & Android platforms in React Native</li>
          <li>
            Developed a Single Page Application (SPA) for management of app information and a REST API in Node JS
            including JWT authentication and integration with Sage SOAP backend
          </li>
          <li>Set up continuous deployment pipeline for mobile apps using Fastlane.</li>
        </ul>

        {/* HMRC */}
        <h3 className="prose-h3 mt-2 mb-0">
          Scrum Master •{" "}
          <a href="https://www.gov.uk/government/organisations/hm-revenue-customs" target="_blank">
            HMRC
          </a>
        </h3>
        <RoleSummary text="Scrum Master of a co-located team of 17, delivering Personal Tax Repayments, Company Car, Medical Benefits & Tax Estimation services" />
        <Ratios ratios={HMRCRatios} />
        <ul>
          <li>Delivered a team agile transformation, improving process and delivery</li>
          <li>Introduced Mob Programming, User Story Mapping, ATDD/BDD and Example Mapping</li>
          <li>Facilitated daily scrum meetings, sprint planning, review and retrospectives</li>
          <li>Promoted efficient and accurate use of JIRA, providing burndown charts and sprint reports</li>
        </ul>

        {/* EDUCATION & CERTIFICATIONS */}
        <h2 className="prose-h2 mt-4 mb-0">Education and Certifications</h2>
        <ul>
          <li>MSc Computer Science, University of York</li>
          <li>BA (Hons) Politics, University of Leicester</li>
          <li>Certified Scrum Master (CSM) ScrumAlliance.org</li>
          <li>Certified Product Owner (CSPO) ScrumAlliance.org</li>
        </ul>
      </div>
    </div>
  );
}

export default FullStackEngineerPublicSector;
