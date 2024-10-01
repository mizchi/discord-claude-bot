import { verifyKey } from 'discord-interactions';
import { Env, Interaction } from './types';

export async function verifyDiscordRequest(
  request: Request,
  env: Env,
): Promise<
  | { isValid: false; interaction: undefined }
  | {
      interaction: Interaction;
      isValid: true;
    }
> {
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');
  const body = await request.text();
  const isValidRequest =
    signature &&
    timestamp &&
    verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);
  if (!isValidRequest) {
    return { isValid: false, interaction: undefined };
  }
  return { interaction: JSON.parse(body), isValid: true };
}

export function createMessage(
  content: string,
  opts: { token: string; appId: string },
) {
  console.log('[Create message]', content);

  const endpoint = `https://discord.com/api/v10/webhooks/${opts.appId}/${opts.token}`;
  return fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ content }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function updateMessage(
  content: string,
  opts: { token: string; appId: string },
) {
  const patch_endpoint = `https://discord.com/api/v10/webhooks/${opts.appId}/${opts.token}/messages/@original`;
  await fetch(patch_endpoint, {
    method: 'PATCH',
    body: JSON.stringify({ content }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
