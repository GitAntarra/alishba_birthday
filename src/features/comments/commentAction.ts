// src/features/user/actions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { pushComment, setComment, setCommentErr, setCommentLoad, setComments } from "./commentSlice";
import { AddCommentDto, Comment } from "./commentInterface";
import { fetchApi } from "@/_libs/fetchApi";

export interface CredentialProp {
  username: string;
  password: string;
}

export class ResponseApp<M> {
  err: boolean;

  msg: string;

  data: M;
  constructor(err: boolean, msg: string, data: M) {
    this.err = err;
    this.msg = msg;
    this.data = data;
  }
}

export const fetchAllComment = createAsyncThunk(
  "comment/fetchall",
  async (_, { dispatch }) => {
    try {
      dispatch(setCommentLoad(true));
      const { data }: { data: Comment[] } = await fetchApi.get("/api/comments");
      console.log({ data });
      dispatch(setComments(data));
    } catch (error: any) {
      console.log({ error });

      dispatch(setCommentErr(error.message));
    } finally {
      dispatch(setCommentLoad(false));
    }
  }
);

export const fetchCommentById = createAsyncThunk(
  "guest/fetchByname",
  async (id: string, { dispatch }) => {
    try {
      dispatch(setCommentLoad(true));
      const { data }: { data: Comment } = await fetchApi.get(
        `/api/guests/${id}`
      );
      console.log({ data });
      dispatch(setComment(data));
    } catch (error: any) {
      console.log({ error });

      dispatch(setCommentErr(error.message));
    } finally {
      dispatch(setCommentLoad(false));
    }
  }
);

export const addComment = createAsyncThunk(
  "guest/attend",
  async (payload: AddCommentDto, { dispatch }) => {
    try {
      dispatch(setCommentLoad(true));
      const { data }: { data: Comment } = await fetchApi.post(
        `/api/comments`, payload
      );
      dispatch(pushComment(data));
    } catch (error: any) {
      dispatch(setCommentErr(error.message));
    } finally {
      dispatch(setCommentLoad(false));
    }
  }
);
