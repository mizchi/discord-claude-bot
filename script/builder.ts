// create json but not on runtime
import { SlashCommandBuilder } from "discord.js";

export const AI_COMMAND = new SlashCommandBuilder()
  .setName('ai')
  .setDescription('Chat to Claude3 AI')
  .addStringOption(option =>
    option.setName('message')
      .setDescription('The text to send to the AI')
      .setRequired(true)
  )
  .toJSON();

console.log(AI_COMMAND);