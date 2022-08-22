import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addPointeau, getListPointeaux } from "../../api/pointeaux.service";

const initialState = []

export const getPointeaux = createAsyncThunk(
  "pointeau/getAll",
  async () => {
    const res = await getListPointeaux();
    return res;
  }
);

export const postPointeaux = createAsyncThunk(
  "pointeau/add",
  async (data) => {
    const res = await addPointeau(data);
    return res;
  }
);

export const pointeauSlice = createSlice({
  name: 'counter',
  initialState,
  extraReducers: {
    [getPointeaux.fulfilled]: (state, action) => {
      console.log("GET",action)
      return [...action.payload]
    },
    [postPointeaux.fulfilled]: (state, action) => {
      console.log("POST",action)
      state.push(action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
const { reducer } = pointeauSlice;
export default reducer;