export type Ratio = {
  label: string;
  value: number;
};

export default function Ratios({ ratios }: { ratios: Ratio[] }) {
  // order retios by value & alphatetically
  ratios.sort((a, b) => {
    return b.value - a.value;
  });

  return (
    <div className="ui-not-prose ui-flex ui-flex-wrap ui-gap-x-1 ui-gap-y-2">
      {ratios.map((ratio) => {
        let colors;
        if (ratio.label === "Web") {
          colors = `ui-bg-red-50 ui-text-red-700 ui-ring-red-600/10`;
        }
        if (ratio.label === "Testing") {
          colors = `ui-bg-yellow-50 ui-text-yellow-800 ui-ring-yellow-600/20`;
        }
        if (ratio.label === "Back-end") {
          colors = `ui-bg-green-50 ui-text-green-700 ui-ring-green-600/20`;
        }
        if (ratio.label === "Mobile") {
          colors = `ui-bg-blue-50 ui-text-blue-700 ui-ring-blue-700/10`;
        }
        if (ratio.label === "Design") {
          colors = `ui-bg-indigo-50 ui-text-indigo-700 ui-ring-indigo-700/10`;
        }
        if (ratio.label === "AI") {
          colors = `ui-bg-purple-50 ui-text-purple-700 ui-ring-purple-700/10`;
        }
        if (ratio.label === "Delivery") {
          colors = `ui-bg-pink-50 ui-text-pink-700 ui-ring-pink-700/10`;
        }

        return (
          <span
            key={ratio.label}
            className={`ui-inline-flex ui-items-center ui-rounded-md ui-px-2 ui-py-1 ui-text-xs ui-font-medium ui-ring-1 ui-ring-inset ${colors}`}
          >
            {ratio.label} ({ratio.value}%)
          </span>
        );
      })}
    </div>
  );
}
