import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addPointeau, getListPointeaux, updatePointeau, deletePointeau } from "../../api/pointeaux.service";

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

export const updatePointeaux = createAsyncThunk(
  "pointeau/update",
  async (data) => {
     const res = await updatePointeau(data);
    return res;
  }
);

export const deletePointeaux = createAsyncThunk(
  "pointeau/delete",
  async (id) => {
      await deletePointeau(id);
    return id;
  }
);

export const pointeauSlice = createSlice({
  name: 'counter',
  initialState,
  extraReducers: {
    [getPointeaux.fulfilled]: (state, action) => {
      return [...action.payload]
    },
    [postPointeaux.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [updatePointeaux.fulfilled]: (state, action) => {
      const index = state.findIndex(pointeau => pointeau.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deletePointeaux.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
})

// Action creators are generated for each case reducer function
const { reducer } = pointeauSlice;
export default reducer;