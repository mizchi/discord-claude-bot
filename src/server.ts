import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions';
import commands from './commands.json';
import { chat } from "./ai.ts";

type Env = {
  DISCORD_PUBLIC_KEY: string; // public key for verifying requests
  DISCORD_APPLICATION_ID: string; // application id for oauth
  ANTHROPIC_API_KEY: string; // anthropic api key
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (request.method === 'GET') {
      return new Response(`👋 ${env.DISCORD_APPLICATION_ID}`);
    }
    const { isValid, interaction } = await verifyDiscordRequest(
      request,
      env,
    );
    if (!isValid || !interaction) {
      return new Response('Bad request signature.', { status: 401 });
    }
    if (interaction.type === InteractionType.PING) {
      return Response.json({ type: InteractionResponseType.PONG });
    }
    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
      // Most user commands will come as `APPLICATION_COMMAND`.
      switch (interaction.data.name.toLowerCase()) {
        case commands.CLAUDE_COMMAND.name.toLowerCase(): {
          const message = interaction.data.options[0].value as string;
          ctx.waitUntil(handleDeferredInteraction(message, interaction.token, env));
          return Response.json({
            type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `message: ${message}`
            }
          });
        }
        default:
          return Response.json({ error: 'Unknown Type' }, { status: 400 });
      }
    }
    return Response.json({ error: 'Unknown Type' }, { status: 400 });
  },
};

async function handleDeferredInteraction(message: string, token: string, env: Env) {
  const aiResponse = await chat(message, { apiKey: env.ANTHROPIC_API_KEY });
  const endpoint = `https://discord.com/api/v10/webhooks/${env.DISCORD_APPLICATION_ID}/${token}`;
  await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      content: `> ${message}\n---\n${aiResponse}`,
    }),
    headers: {
      "Content-Type": "application/json",
    }
  });
}

async function verifyDiscordRequest(request: Request, env: Env) {
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');
  const body = await request.text();
  const isValidRequest =
    signature &&
    timestamp &&
    verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);
  if (!isValidRequest) {
    return { isValid: false };
  }
  return { interaction: JSON.parse(body), isValid: true };
}

