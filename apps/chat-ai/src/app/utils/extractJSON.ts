export function extractJSON(str: string) {
  const regex = /{(?:[^{}]|{[^{}]*})*}/gs;
  let match: string[] | null;
  const matches = [];
  while ((match = regex.exec(str)) !== null) {
    try {
      // @ts-expect-error
      matches.push(JSON.parse(match[0]));
    } catch (e) {
      console.error("Invalid JSON detected");
    }
  }
  return matches;
}

// const response = `Your API response here...`;
// const jsonObjects = extractJSON(response);
// console.log(jsonObjects);
