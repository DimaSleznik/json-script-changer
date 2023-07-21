import { configureStore } from '@reduxjs/toolkit'
import jsonData from './slices/jsonData.ts';
import selectedFields from './slices/selectedFields.ts';
import currantFieldModification from './slices/currantFieldModification.ts';

const store = configureStore({
  reducer: {
    jsonData,
    selectedFields,
    currantFieldModification
  },
})
export type RootState = ReturnType<typeof store.getState>

export default store