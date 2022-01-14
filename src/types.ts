export interface db {
  "chat-rooms": Chatroom[];
  comments: Comment[];
  users: User[];
}

export interface Chatroom {
  id: string;
  title: string;
  comments_url: string;
  comments: Comment[];
  selected: boolean;
}

export interface Comment {
  id: string;
  message: string;
  created_at?: string;
  sender_name?: string;
}

export interface User {
  id?: string;
  name: string;
  created_at?: string;
}
