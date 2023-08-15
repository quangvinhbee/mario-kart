import { Action, createSlice } from '@reduxjs/toolkit'

export interface SettingCommon {
  lang: string
  theme: string
  openSound: boolean
}

interface IUpdateThemeAction extends Action {
  payload: 'light' | 'dark'
}

const initialState: SettingCommon = {
  lang: 'en',
  theme: 'dark',
  openSound: false,
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
    updateOpenSoundSetting: (state: SettingCommon, action: any) => {
      return {
        ...state,
        openSound: action.payload,
      }
    },
  },
})

export const { changeLanguageSetting, updateThemeSetting, updateOpenSoundSetting } =
  SettingCommonSlice.actions

export const namespace = 'SettingCommonSlice'

export default SettingCommonSlice.reducer
