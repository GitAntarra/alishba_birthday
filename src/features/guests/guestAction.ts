// src/features/user/actions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setGuest, setGuestErr, setGuestLoad, setGuests } from "./guestSlice";
import { Guest } from "./guestInterface";
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

export const fetchAllPost = createAsyncThunk(
  "guest/fetchall",
  async (_, { dispatch }) => {
    try {
      dispatch(setGuestLoad(true));
      const { data }: { data: Guest[] } = await fetchApi.get("/api/guest");
      console.log({ data });
      dispatch(setGuests(data));
    } catch (error: any) {
      console.log({ error });

      dispatch(setGuestErr(error.message));
    } finally {
      dispatch(setGuestLoad(false));
    }
  }
);

export const fetchGuestByName = createAsyncThunk(
  "guest/fetchByname",
  async (name: string, { dispatch }) => {
    const upName = name.toUpperCase();
    try {
      dispatch(setGuestLoad(true));
      const { data }: { data: Guest } = await fetchApi.get(
        `/api/guests/name/${upName}`
      );
      console.log({ data });
      dispatch(setGuest(data));
    } catch (error: any) {
      console.log({ error });

      dispatch(setGuestErr(error.message));
    } finally {
      dispatch(setGuestLoad(false));
    }
  }
);

export const updateAttend = createAsyncThunk(
  "guest/attend",
  async (id: number, { dispatch }) => {
    try {
      dispatch(setGuestLoad(true));
      const { data }: { data: Guest } = await fetchApi.get(
        `/api/guests/attend/${id}`
      );
      dispatch(setGuest(data));
    } catch (error: any) {
      console.log({ error });

      dispatch(setGuestErr(error.message));
    } finally {
      dispatch(setGuestLoad(false));
    }
  }
);
