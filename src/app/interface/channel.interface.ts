export interface Channel {
  id?: string;
  name: string;
  description: string;
  creator: string;
  privatChannel: boolean;
  hashtag: string;
  addedUser: Array<string>;
}
