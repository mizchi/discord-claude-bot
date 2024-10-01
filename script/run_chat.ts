// debug logics
import { anthropic } from '@ai-sdk/anthropic';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { searchByTavily } from '../src/tools.ts';
const { fullStream } = await streamText({
  model: anthropic('claude-3-5-sonnet-20240620', {
    cacheControl: true,
  }),
  tools: {
    search: tool({
      description: `Search the web for information by tavily. Call me if you don't know something.`,
      parameters: z.object({
        query: z.string().describe('The query to search for'),
      }),
      async execute({ query }) {
        console.log('[tools:tavily]:', query);
        try {
          const result = await searchByTavily(
            process.env.TAVILY_API_KEY!,
            query,
          );
          return result;
        } catch (e) {
          console.error(e);
          throw e;
        }
      },
    }),
  },
  maxSteps: 5,
  toolChoice: 'auto',

  prompt: '新生FF14の発売日はいつですか',
});

let buf = '';
let id = setInterval(() => {
  // console.log('[writer]', buf);
}, 32);

for await (const part of fullStream) {
  switch (part.type) {
    case 'text-delta': {
      const text = part.textDelta;
      buf += text;
      process.stdout.write(text);
      // console.log(text);
      break;
    }
  }
  // buf += text;
  // process.stdout.write(text);
  // console.log(text);
}
clearInterval(id);

// console.log('[final]', buf);
