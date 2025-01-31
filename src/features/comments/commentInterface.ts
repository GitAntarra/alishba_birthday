import { Guest } from "../guests/guestInterface";

export interface Comment {
  id: string;
  guestId: number;
  message: string;
  createdAt: string;
  guest: Guest;
}

export interface AddCommentDto {
  guestId: number
  message: string;
}