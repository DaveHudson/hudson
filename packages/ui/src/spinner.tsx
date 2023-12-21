export function Spinner() {
  return (
    <svg className="ui-animate-spin ui-h-7 ui-w-7 ui-mr-3 ui-fill-transparent ..." viewBox="0 0 24 24">
      <circle
        className="ui-opacity-25 ui-fill-transparent"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="ui-fill-sky-600"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
