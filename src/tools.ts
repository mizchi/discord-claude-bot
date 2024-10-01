export type TavilySearchResult = {
  query: string;
  follow_up_questions: null;
  answer: null;
  images: [];
  results: {
    title: string;
    url: string;
    content: string;
    score: number;
    raw_content: null;
  }[];
  response_time: number;
};

export async function searchByTavily(
  tavilyApiKey: string,
  query: string,
): Promise<TavilySearchResult> {
  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: tavilyApiKey,
      query,
    }),
  });
  return res.json();
}
