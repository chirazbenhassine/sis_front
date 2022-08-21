import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getListPointeaux } from "../../api/pointeaux.service";

const initialState = []

export const getPointeaux = createAsyncThunk(
  "pointeau/getAll",
  async () => {
    const res = await getListPointeaux();
    return res;
  }
);

export const pointeauSlice = createSlice({
  name: 'counter',
  initialState,
  extraReducers: {
    [getPointeaux.fulfilled]: (state, action) => {
      console.log("éééééééé",action)
      return [...action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
const { reducer } = pointeauSlice;
export default reducer;