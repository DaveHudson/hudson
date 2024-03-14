const colorClasses = [
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-gray-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-gray-600 ui-ring-1 ui-ring-inset ui-ring-gray-500/10",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-red-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-red-700 ui-ring-1 ui-ring-inset ui-ring-red-600/10",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-yellow-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-yellow-800 ui-ring-1 ui-ring-inset ui-ring-yellow-600/20",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-green-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-green-700 ui-ring-1 ui-ring-inset ui-ring-green-600/20",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-blue-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-blue-700 ui-ring-1 ui-ring-inset ui-ring-blue-700/10",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-indigo-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-indigo-700 ui-ring-1 ui-ring-inset ui-ring-indigo-700/10",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-purple-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-purple-700 ui-ring-1 ui-ring-inset ui-ring-purple-700/10",
  "ui-inline-flex ui-items-center ui-rounded-md ui-bg-pink-50 ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-text-pink-700 ui-ring-1 ui-ring-inset ui-ring-pink-700/10",
];

export function ThingsLove({ loves }: { loves: string[] }): JSX.Element {
  return (
    <div className="ui-flex ui-space-x-2">
      {loves.map((love, index) => (
        <span key={index} className={colorClasses[index % colorClasses.length]}>
          {love}
        </span>
      ))}
    </div>
  );
}
