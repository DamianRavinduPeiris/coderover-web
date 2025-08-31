export function decodeBase64(str: string): string {
  try {
    const binary = window.atob(str);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return atob(str);
  }
}

export type ReviewCategory = 'Defects' | 'Performance' | 'Vulnerabilities';
export interface ReviewMessage {
  category: ReviewCategory;
  text: string;
}

export function parseReviewText(text: string): ReviewMessage[] {
  const categories: { [K in ReviewCategory]: string[] } = {
    Defects: [],
    Performance: [],
    Vulnerabilities: [],
  };
  let current: ReviewCategory | null = null;
  const lines = text.split(/\n/);
  for (let line of lines) {
    line = line.trim();
    if (/^Defects[:：]?/i.test(line)) { current = 'Defects'; continue; }
    if (/^Performance Improvements?[:：]?/i.test(line)) { current = 'Performance'; continue; }
    if (/^Potential Vulnerabilities?[:：]?/i.test(line)) { current = 'Vulnerabilities'; continue; }
    if (current && line.startsWith('- ')) {
      categories[current].push(line.replace(/^- /, ''));
    }
  }
  return [
    ...categories.Defects.map(text => ({ category: 'Defects' as ReviewCategory, text })),
    ...categories.Performance.map(text => ({ category: 'Performance' as ReviewCategory, text })),
    ...categories.Vulnerabilities.map(text => ({ category: 'Vulnerabilities' as ReviewCategory, text })),
  ];
}
