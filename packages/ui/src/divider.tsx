export default function Divider({ text }: { text: string }) {
  return (
    <div className="ui-relative ui-mt-4 ui-mb-3 ui-ml-2 ui-mr-2">
      <div className="ui-absolute ui-inset-0 ui-flex ui-items-center" aria-hidden="true">
        <div className="ui-w-full ui-border-t ui-border-gray-300" />
      </div>
      <div className="ui-relative ui-flex ui-justify-center">
        <span className="ui-bg-slate-800 ui-px-2 ui-text-sm ui-text-gray-200">{text}</span>
      </div>
    </div>
  );
}
