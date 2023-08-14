import { createSlice } from '@reduxjs/toolkit'

export interface CoinCommon {
  lastVotedAt: { [key: string]: string }
  [key: string]: any
}

const initialState: CoinCommon = {
  filter: {
    chain: '-1',
    type: '6',
  },
  lastVotedAt: {},
}

export const CoinCommonSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    handleUpdatePromote: (state: CoinCommon, action: any) => {
      return {
        ...state,
        promote: action.payload,
      }
    },
    handleUpdateHighlight: (state: CoinCommon, action: any) => {
      return {
        ...state,
        highlight: action.payload,
      }
    },
    handleUpdateFilter: (state: CoinCommon, action: any) => {
      return {
        ...state,
        filters: action.payload,
      }
    },
    handleUpdateChains: (state: CoinCommon, action: any) => {
      return {
        ...state,
        chains: action.payload,
      }
    },
    upvoteCoin: (state: CoinCommon, action: any) => {
      return {
        ...state,
        lastVotedAt: {
          ...state?.lastVotedAt,
          [action.payload]: new Date().toISOString(),
        },
      }
    },
  },
})

export const { handleUpdatePromote, handleUpdateHighlight, handleUpdateFilter, upvoteCoin } =
  CoinCommonSlice.actions

export const namespace = 'CoinCommonSlice'

export default CoinCommonSlice.reducer
