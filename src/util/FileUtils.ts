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

export function parseReviewTextFromGpt5(response: any): ReviewMessage[] {
  // expects ReviewResponse type
  const outputArr = response?.data?.output || [];
  let text = '';
  for (const item of outputArr) {
    if (item.type === 'message' && Array.isArray(item.content)) {
      for (const content of item.content) {
        if (content.type === 'output_text' && typeof content.text === 'string') {
          text += content.text + '\n';
        }
      }
    }
  }
  // fallback to old parser for category extraction
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
