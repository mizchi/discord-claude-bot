// create json but not on runtime
import { SlashCommandBuilder } from "discord.js";
import { join, dirname } from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CLAUDE_COMMAND = new SlashCommandBuilder()
  .setName('claude')
  .setDescription('Chat to Claude3 AI')
  .addStringOption(option =>
    option.setName('input')
      .setDescription('The text to send to the AI')
      .setRequired(true)
  )
  .toJSON();

const outputPath = join(__dirname, '../src', 'commands.json');
await fs.writeFile(outputPath, JSON.stringify({ CLAUDE_COMMAND }, null, 2));
