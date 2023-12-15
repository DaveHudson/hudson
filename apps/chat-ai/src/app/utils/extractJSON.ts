export function extractJSON(str: string): [any, number, number] | null {
  const regex = /{[\s\S]*}/;
  const match = regex.exec(str);

  if (match) {
    try {
      return [JSON.parse(match[0]), match.index, match.index + match[0].length];
    } catch (e) {
      // we expect invalid JSON due to streaming, just silently fail
      return null;
    }
  }

  return null;
}

export function extractJSONWithBackticks(str: string): any[] {
  // Match JSON objects in markdown code blocks
  const regex = /```json((?:.|\n)*?)```/g;
  const matches = Array.from(str.matchAll(regex));

  // Parse JSON objects
  const jsonObjects = matches
    .map((match) => {
      try {
        return JSON.parse(match[1]);
      } catch (e) {
        console.error("Invalid JSON detected");
        return null;
      }
    })
    .filter((obj) => obj !== null);

  return jsonObjects;
}
