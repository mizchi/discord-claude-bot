import type { CoreMessage } from 'ai';
import { Env } from './types';

export async function loadHistory(
  env: Env,
  channel_id: string,
): Promise<CoreMessage[]> {
  return (await env.CHAT_HISTORY.get(channel_id, { type: 'json' })) ?? [];
}

export async function saveHistory(
  env: Env,
  channel_id: string,
  messages: CoreMessage[],
) {
  const latest = messages.slice(-10);
  await env.CHAT_HISTORY.put(channel_id, JSON.stringify(latest), {
    expirationTtl: 60 * 60 * 24,
  });
}

// export function formatHistory(messages: CoreMessage[]) {
//   return messages
//     .map((msg) => {
//       if (typeof msg.content === 'string') {
//         return `${msg.role}: ${msg.content}`;
//       } else {
//         const content = msg.content.map((c) => c.text).join('\n');
//         return `${msg.role}: ${content}`;
//       }
//     })
//     .join('\n\n');
// }
