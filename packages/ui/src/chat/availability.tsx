import { CalendarDaysIcon, CreditCardIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Availability as AvailabilityEnum } from "../../../../apps/cv-ai-chat/src/app/utils/availability.ts";
const colorClasses = [
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-gray-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-gray-600 ui-ring-1 ui-ring-inset ui-ring-gray-500/10 ui-mr-1",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-red-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-red-700 ui-ring-1 ui-ring-inset ui-ring-red-600/10 ui-mr-1",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-yellow-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-yellow-800 ui-ring-1 ui-ring-inset ui-ring-yellow-600/20 ui-mr-1",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-green-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-green-700 ui-ring-1 ui-ring-inset ui-ring-green-600/20 ui-mr-1",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-blue-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-blue-700 ui-ring-1 ui-ring-inset ui-ring-blue-700/10 ui-mr-1",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-indigo-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-indigo-700 ui-ring-1 ui-ring-inset ui-ring-indigo-700/10 ui-mr-1",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-purple-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-purple-700 ui-ring-1 ui-ring-inset ui-ring-purple-700/10 ui-mr-1",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-pink-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-pink-700 ui-ring-1 ui-ring-inset ui-ring-pink-700/10 ui-mr-1",
];
const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "Remix",
  "Tailwind CSS",
  "Vercel AI SDK",
  "Langchain",
  "Storybook",
  "Cypress",
];
export function Availability({ status }: { status: AvailabilityEnum }) {
  return (
    <div className="ui-lg:col-start-3 ui-lg:row-end-1">
      <h2 className="ui-sr-only">Summary</h2>
      <div className="ui-rounded-lg ui-bg-gray-50 ui-shadow-sm ui-ring-1 ui-ring-gray-900/5">
        <dl className="ui-flex ui-flex-wrap">
          <div className="ui-flex-auto ui-pl-6 ui-pt-6">
            <dt className="ui-text-sm ui-font-semibold ui-leading-6 ui-text-gray-900">Front-end Contract Engineer</dt>
            <dd className="ui-mt-1 ui-text-base ui-font-semibold ui-leading-6 ui-text-gray-900 ui-space-y-1">
              {skills.map((skill, index) => (
                <span key={index} className={colorClasses[index % colorClasses.length]}>
                  {skill}
                </span>
              ))}
            </dd>
          </div>
          <div className="ui-mt-6 ui-flex ui-w-full ui-flex-none ui-gap-x-4 ui-border-t ui-border-gray-900/5 ui-px-6 ui-pt-6">
            <dt className="ui-flex-none">
              <span className="ui-sr-only">Client</span>
              <UserCircleIcon className="ui-h-6 ui-w-5 ui-text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="ui-text-sm ui-font-medium ui-leading-6 ui-text-gray-900">Dave Hudson</dd>
          </div>
          <div className="ui-mt-4 ui-flex ui-w-full ui-flex-none ui-gap-x-4 ui-px-6">
            <dt className="ui-flex-none">
              <span className="ui-sr-only">Available date</span>
              <CalendarDaysIcon className="ui-h-6 ui-w-5 ui-text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="ui-text-sm ui-leading-6 ui-text-gray-500">
              <time dateTime="2023-01-31">Availability: {status}</time>
            </dd>
          </div>
          <div className="ui-mt-4 ui-flex ui-w-full ui-flex-none ui-gap-x-4 ui-px-6">
            <dt className="ui-flex-none">
              <span className="ui-sr-only">Status</span>
              <CreditCardIcon className="ui-h-6 ui-w-5 ui-text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="ui-text-sm ui-leading-6 ui-text-gray-500">Day rate: negotiable</dd>
          </div>
        </dl>
        <div className="ui-mt-6 ui-border-t ui-border-gray-900/5 ui-px-6 ui-py-6">
          <a
            href="mailto:dave@applification.net?subject=Availability%20request"
            className="ui-text-sm ui-font-semibold ui-leading-6 ui-text-gray-900"
          >
            Email <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
