"use client";
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
} from "../utils/cv-ratios";
import Ratios from "@repo/ui/ratios";
import RoleSummary from "@repo/ui/role-summary";
import Divider from "@repo/ui/divider";
import { Badge } from "@repo/ui/catalyst/badge";
import { currentAvailability } from "../utils/availability";
import { languages } from "../utils/languages";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function Aside() {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <div className="p-6 pr-0 prose space-y-2 h-screen overflow-scroll" onScroll={handleScroll}>
      Scroll top: <b>{scrollTop}</b>
      <h2 className="text-slate-200">Full-Stack TypeScript Engineer</h2>
      {/* <div className="flex space-x-2 text-sm items-center text-slate-100">
      <PhoneIcon className="h-5 w-5 inline-block mr-1 -mt-1 stroke-white" />
      <Badge color="sky">
        <a className="text-sky-300" href="tel:+447700142760">
          +447700142760
        </a>
      </Badge>
    </div> */}
      <div className="flex space-x-2 text-sm items-center text-slate-100">
        <CalendarDaysIcon className="h-5 w-5 inline-block mr-1 -mt-1 stroke-white" />
        <Badge color="sky">{currentAvailability} availability</Badge>
      </div>
      <Divider text="Experience" />
      <h3 className="prose-em text-gray-300 mt-0 mb-0">AI Engineer • Applification</h3>
      <RoleSummary text="Open-source AI Engineer" />
      <Ratios ratios={AIEngineerRatios} />
      <h3 className="prose-em text-gray-300 mb-0 mt-4">Full-Stack Engineer • Peppy Health</h3>
      <RoleSummary text="Transformed architecture of complex brownfield web app with zero tests &amp; outdated design patterns, supporting practitioners to aid growth of Peppy to £12m ARR" />
      <Ratios ratios={PeppyRatios} />
      <h3 className="prose-em text-gray-300 mb-0 mt-4">Full-Stack Engineer • Pando</h3>
      <h4 className="prose-h4 mt-2 mb-0 text-gray-300">Pando Admin</h4>
      <RoleSummary
        text="Architected, developed and tested web app messaging & management platform used by over 65,000 healthcare
    professionals within the NHS, including low bandwidth MoD clinicians"
      />
      <Ratios ratios={PandoAdminRatios} />
      <h4 className="prose-h4 mt-4 mb-0 text-gray-300">Pando Access</h4>
      <RoleSummary text="Designed &amp; built proof of concept prototype for Pando Access in 4 weeks, across Web, Mobile & API" />
      <Ratios ratios={PandoAccessRatios} />
      <h3 className="prose-em text-gray-300 mb-0 mt-4">Full-Stack Engineer • Surevine</h3>
      <h4 className="prose-h4 mt-2 mb-0 text-gray-300">Web App UK Govt (MoD)</h4>
      <RoleSummary text="Architected, developed and tested a secure web app for the UK MoD" />
      <Ratios ratios={SurevineMODRatios} />
      <h4 className="prose-h4 mt-4 mb-0 text-gray-300">Web App (Cabinet Office)</h4>
      <RoleSummary text="Architected, developed and tested a secure text, audio & video communication-based web app" />
      <Ratios ratios={SurevineVideoRatios} />
      <h4 className="prose-h4 mt-4 mb-0 text-gray-300">Web App (Cabinet Office)</h4>
      <RoleSummary text="Agile delivery of a complex high security cross-domain communication system" />
      <Ratios ratios={SurevineCommsRatios} />
      <h4 className="prose-h4 mt-4 mb-0 text-gray-300">Security Cleared Web App (UK Govt Security)</h4>
      <RoleSummary text="Architected, developed and tested a secure intranet web app for the UK Govt" />
      <Ratios ratios={SurevineHQRatios} />
      <h3 className="prose-em text-gray-300 mb-0 mt-4">Full-Stack Engineer • Vidatec</h3>
      <h4 className="prose-h4 mt-4 mb-0 text-gray-300">Tech Lead British Army (MoD)</h4>
      <RoleSummary
        text="Architected, developed and tested a Progressive Web App to support internal army communications on low bandwidth
    mobile devices"
      />
      <Ratios ratios={VidatecBritishArmyRatios} />
      <h4 className="prose-h4 mt-4 mb-0 text-gray-300">Scrum Master • Virgin Trains</h4>
      <RoleSummary text="Agile delivery of Virgin Trains East Coast Travel Buddy mobile app" />
      <Ratios ratios={VidatecVirginRatios} />
      <h4 className="prose-h4 mt-4 mb-0 text-gray-300">Full-Stack Tech Lead • TUI Travel</h4>
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
      <div className="text-gray-300 text-sm">{languages}</div>
    </div>
  );
}
