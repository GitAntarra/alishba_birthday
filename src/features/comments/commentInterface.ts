import { Guest } from "../guests/guestInterface";

export interface Comment {
  id: number;
  guestId: number;
  message: string;
  createdAt: string;
  guest: Guest;
}

export interface AddCommentDto {
  guestId: number
  message: string;
}