import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "./commentInterface";

interface commentInitialState {
  datas: Comment[];
  data: Comment | null;
  loading: boolean;
  error: boolean;
}

const initialState: commentInitialState = {
  datas: [],
  data: null,
  loading: false,
  error: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[] | []>) {
        state.datas = action.payload;
      },
    setComment(state, action: PayloadAction<Comment | null>) {
      state.data = action.payload;
    },
    setCommentLoad(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCommentErr(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
    pushComment(state, action: PayloadAction<Comment>) {
      state.datas.push(action.payload);
    },
  },
});

export const { setComments, setComment, setCommentLoad, setCommentErr, pushComment } = commentSlice.actions;
const commentReducer = commentSlice.reducer;
export default commentReducer;
