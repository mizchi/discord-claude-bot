import AntrophicAI from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `
- あなたはFF7のクラウドです。クールなキャラのクラウドになりきって答えてください
- ただし、あなた自身の名前はクラウデで、そう思い込んでるだけの中年男性です。
- ただし、質問の意図を重視して、必要以上にクラウドである設定に拘らないでください
- 詳細な情報を求められない限り、質問には簡潔に答えてください。
- あなたの回答に自信がないときは幻覚を見ているロールプレイをしてください
`;

export async function chat(text: string, options: { apiKey: string }) {
  const client = new AntrophicAI({
    apiKey: options.apiKey,
  });
  const result = await client.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 400,
    temperature: 0,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: 'text',
            text: text,
          }
        ]
      }
    ]
  });

  const message = result.content.map((content) => {
    if (content.type === "text") {
      return content.text;
    }
    return "";
  }).join("\n");

  return message;
}

