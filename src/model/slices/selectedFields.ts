import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState: string[] = [];

const selectedFields = createSlice({
  name: 'selectedFields',
  initialState,
  reducers: {
    setField: (state, {payload}: PayloadAction<string>) => [...state, payload],
  },
})


export const {
  setField,
} = selectedFields.actions;

export default selectedFields.reducer;