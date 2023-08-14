import { createSlice } from '@reduxjs/toolkit'

export interface AuthCommon {
  storage: ''
}

const initialState: AuthCommon = {
  storage: '',
}

export const AuthCommonSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleUpdateAuth: (state: AuthCommon, action: any) => {
      return {
        ...state,
        storage: action.payload,
      }
    },
    removeAuth: (state) => {
      return {
        ...state,
        storage: '',
      }
    },
  },
})

export const { handleUpdateAuth, removeAuth } = AuthCommonSlice.actions

export const namespace = 'AuthCommonSlice'

export default AuthCommonSlice.reducer
