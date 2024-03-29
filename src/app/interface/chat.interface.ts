export interface Chat {
  id: string;
  userId: string;
  channelId: string;
  message: string;
  publishedTimestamp: number;
}

export interface ChatAnswers {
  id: string;
  chatId: string;
  message: string;
  publishedTimestamp: number;
  userId: string;
}
