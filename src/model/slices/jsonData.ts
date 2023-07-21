import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState = {
  "txnId": {
    "display": [1,2,3,4,5,6],
    "real": "5328564224159"
  },
  "type": {
    "display": "Manual Order",
    "real": "shopify.MANUAL_CHARGE"
  },
  "payer": "CAD Customer",
  "amount": 20.14,
  "currency": "USD",
  "date": "02:28 14 Jul, 2023"
}

 const jsonData = createSlice({
  name: 'jsonData',
  initialState,
  reducers: {
    setData: (_, {payload}: PayloadAction<any>) => payload,
  },
})


export const {
  setData,
} = jsonData.actions;

export default jsonData.reducer;