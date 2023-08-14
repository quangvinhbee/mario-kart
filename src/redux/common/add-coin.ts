import { createSlice } from '@reduxjs/toolkit'

export interface AddCoinCommon {}

const initialState: AddCoinCommon = {
  detailCoin: {
    chainId: 56,
    launch: new Date().toLocaleDateString(),
  },
}

export const AddCoinCommonSlice = createSlice({
  name: 'addCoin',
  initialState,
  reducers: {
    handleUpdateDetailCoin: (state: AddCoinCommon, action: any) => {
      return {
        ...state,
        detailCoin: action.payload,
      }
    },
  },
})

export const { handleUpdateDetailCoin } = AddCoinCommonSlice.actions

export const namespace = 'AddCoinCommonSlice'

export default AddCoinCommonSlice.reducer
