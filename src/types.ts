import type {
  InteractionResponseFlags,
  InteractionResponseType,
  InteractionType,
} from 'discord-interactions';

export type Env = {
  DISCORD_PUBLIC_KEY: string; // public key for verifying requests
  DISCORD_APPLICATION_ID: string; // application id for oauth
  ANTHROPIC_API_KEY: string; // anthropic api key
  CHAT_HISTORY: KVNamespace;
  DISCORD_TOKEN: string;
  TAVILY_API_KEY: string;
};

export type ChannelMessageResponse = {
  type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE;
  data: {
    content: string;
    flags?: InteractionResponseFlags.EPHEMERAL;
  };
};

export type DeferredChannelMessageResponse = {
  type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE;
};

export type Interaction = {
  app_permissions: string;
  application_id: string;
  authorizing_integration_owners: Record<string, string>;
  channel: Channel;
  channel_id: string;
  context: number;
  data: InteractionCommandData;
  entitlement_sku_ids: string[];
  entitlements: unknown[];
  guild: Guild;
  guild_id: string;
  guild_locale: string;
  id: string;
  locale: string;
  member: Member;
  token: string;
  type: InteractionType;
  version: number;
};

type Channel = {
  flags: number;
  guild_id: string;
  id: string;
  last_message_id: string | null;
  name: string;
  nsfw: boolean;
  parent_id: string | null;
  permissions: string;
  position: number;
  rate_limit_per_user: number;
  topic: string | null;
  type: number;
};

export enum InteractionDataType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
}
export type InteractionCommandData = {
  name: string;
  type: InteractionDataType.SUB_COMMAND;
  options: InteractionData[];
  value: undefined;
};

export type InteractionData =
  | {
      name: string;
      type: InteractionDataType.STRING;
      value: string;
    }
  | {
      name: string;
      type: InteractionDataType.INTEGER;
      value: number;
    }
  | {
      name: string;
      type: InteractionDataType.BOOLEAN;
      value: boolean;
    }
  | {
      name: string;
      type: InteractionDataType.USER;
      value: User;
    }
  | {
      name: string;
      type: InteractionDataType.CHANNEL;
      value: Channel;
    }
  | InteractionCommandData;

type Guild = {
  features: string[];
  id: string;
  locale: string;
};

type Member = {
  avatar: string | null;
  communication_disabled_until: string | null;
  deaf: boolean;
  flags: number;
  joined_at: string;
  mute: boolean;
  nick: string | null;
  pending: boolean;
  permissions: string;
  premium_since: string | null;
  roles: string[];
  unusual_dm_activity_until: string | null;
  user: User;
};

type User = {
  avatar: string;
  avatar_decoration_data: unknown | null;
  clan: unknown | null;
  discriminator: string;
  global_name: string;
  id: string;
  public_flags: number;
  username: string;
};
