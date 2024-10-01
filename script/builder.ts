// create json but not on runtime
import { SlashCommandBuilder } from 'discord.js';
import { join, dirname } from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CHAT_COMMAND = new SlashCommandBuilder()
  .setName('chat')
  .setDescription('Chat with Claude 3.5 Sonnet')
  .addStringOption((option) =>
    option
      .setName('input')
      .setDescription('The text to send to the AI')
      .setRequired(true),
  )
  .toJSON();

const outputPath = join(__dirname, '../src', 'commands.json');
await fs.writeFile(outputPath, JSON.stringify({ CHAT_COMMAND }, null, 2));
