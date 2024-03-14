import AntrophicAI from "@anthropic-ai/sdk";

export async function chat(text: string, options: { apiKey: string }) {
  const client = new AntrophicAI({
    apiKey: options.apiKey,
  });
  const result = await client.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1000,
    temperature: 0,
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

