export interface Chat {
  id: string;
  userId: string;
  channelId: string;
  message: string;
  edited: boolean;
  publishedTimestamp: number;
}

export interface ChatAnswers {
  id: string;
  chatId: string;
  message: string;
  edited: boolean;
  publishedTimestamp: number;
  userId: string;
}
