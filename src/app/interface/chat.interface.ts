import { SafeHtml } from "@angular/platform-browser";

export interface Chat {
  id: string;
  userId: string;
  channelId: string;
  // message: string | SafeHtml;
  message: string ;
  edited: boolean;
  reactionIcon: string[];
  reactionUserId: string[];
  publishedTimestamp: number;
}

export interface ChatAnswers {
  id: string;
  chatId: string;
  // message: string | SafeHtml;
  message: string ;
  edited: boolean;
  reactionIcon: string[];
  reactionUserId: string[];
  publishedTimestamp: number;
  userId: string;
}

export interface ChatReactions {
  id?: string;
  chatId: string;
  icon: string;
  userId: string[];
}
