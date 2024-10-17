export enum GptTypeRole {
  GPT3="gpt-3.5-turbo",
  GPT4="gpt-4o-2024-08-06",
  GPT_4O_MINI="gpt-4o-mini",
}

export enum RoleType {
  system="system",
  assistant="assistant",
  user="user",
}

export interface MessagesType {
  role: RoleType;
  content: string;
}

