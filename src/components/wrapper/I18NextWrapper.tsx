import { resources } from '@/constants/lang'
import i18n from 'i18next'
import { useEffect } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { useSelector } from 'react-redux'

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
  })

interface I18NextWrapperProps {
  children: any
}

export default function I18NextWrapper({ children }: I18NextWrapperProps) {
  const lang = useSelector((store: any) => store?.SettingCommonSlice.lang)

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
