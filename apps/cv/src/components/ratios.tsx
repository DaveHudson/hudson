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
    <div className="not-prose space-x-1">
      {ratios.map((ratio) => {
        let colors;
        if (ratio.label === "Web") {
          colors = `bg-red-50 text-red-700 ring-red-600/10`;
        }
        if (ratio.label === "Testing") {
          colors = `bg-yellow-50 text-yellow-800 ring-yellow-600/20`;
        }
        if (ratio.label === "Back-end") {
          colors = `bg-green-50 text-green-700 ring-green-600/20`;
        }
        if (ratio.label === "Mobile") {
          colors = `bg-blue-50 text-blue-700 ring-blue-700/10`;
        }
        if (ratio.label === "Design") {
          colors = `bg-indigo-50 text-indigo-700 ring-indigo-700/10`;
        }
        if (ratio.label === "AI") {
          colors = `bg-purple-50 text-purple-700 ring-purple-700/10`;
        }
        if (ratio.label === "Delivery") {
          colors = `bg-pink-50 text-pink-700 ring-pink-700/10`;
        }

        return (
          <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${colors}`}
          >
            {ratio.label} ({ratio.value}%)
          </span>
        );
      })}
    </div>
  );
}
