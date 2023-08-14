import { Action, createSlice } from '@reduxjs/toolkit'

export interface SettingCommon {
  lang: string
  theme: string
}

interface IUpdateThemeAction extends Action {
  payload: 'light' | 'dark'
}

const initialState: SettingCommon = {
  lang: 'en',
  theme: 'dark',
}

export const SettingCommonSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeLanguageSetting: (state: SettingCommon, action: any) => {
      return {
        ...state,
        lang: action.payload,
      }
    },
    updateThemeSetting: (state: SettingCommon, action: IUpdateThemeAction) => {
      return {
        ...state,
        theme: action.payload,
      }
    },
  },
})

export const { changeLanguageSetting, updateThemeSetting } = SettingCommonSlice.actions

export const namespace = 'SettingCommonSlice'

export default SettingCommonSlice.reducer
