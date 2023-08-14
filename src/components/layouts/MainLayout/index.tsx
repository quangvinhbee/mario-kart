import { useEffect, useState } from 'react'
import useScreen from '../../../lib/hooks/useScreen'
// import DefaultHead from '../DefaultHead'
import { Footer } from './Footer'
import { Header } from './Header'

import { useDispatch, useSelector } from 'react-redux'
import 'swiper/css'
import { changeLanguageSetting, updateThemeSetting } from '../../../redux/common/setting'
import DefaultHead from '../DefaultHead'
import SidebarDesktop from './Sidebar/SidebarDesktop'
import SidebarMobile from './Sidebar/SidebarMobile'

declare global {
  interface Window {
    ethereum: any
  }
}

export function MainLayout({ ...props }) {
  const { coin } = props
  const isMd = useScreen('md')
  const isLg = useScreen('lg')
  const dispatch = useDispatch()
  const promote = useSelector((state: any) => state.CoinCommonSlice)
  const [isOpenMenu, setOpenMenu] = useState(false)
  const [isExpandSidebar, setExpandSidebar] = useState(true)

  const getLanguage = async () => {
    if (typeof window != 'undefined') {
      let lang = window.localStorage.getItem('lang')
      if (!lang) {
        window.localStorage.setItem('lang', 'en')
        dispatch(changeLanguageSetting('en'))
      } else {
        dispatch(changeLanguageSetting(lang))
      }
    }
  }

  useEffect(() => {
    getLanguage()
  }, [])

  useEffect(() => {
    setExpandSidebar(isLg)
  }, [isLg])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('theme') == 'dark' || !('theme' in window.localStorage)) {
        dispatch(updateThemeSetting('dark'))
        window.localStorage.setItem('theme', 'dark')
      } else {
        dispatch(updateThemeSetting('light'))
        window.localStorage.setItem('theme', 'light')
      }
    }
  })

  return (
    <div id="main-layout" className="w-full">
      <DefaultHead />
      <div className="relative flex min-h-screen w-full">
        <div className="hidden w-[80px] md:block">
          <SidebarDesktop
            isExpand={isExpandSidebar}
            onToggleExpand={() => setExpandSidebar((state) => !state)}
            isOpenMenu={isOpenMenu}
          />
        </div>
        <div className="w-full md:w-[calc(100%-80px)]">
          {/* <Header
            onClickMenu={() => {
              setOpenMenu(!isOpenMenu)
            }}
            isOpenMenu={isOpenMenu}
          /> */}
          <div className="relative h-screen w-full">{props.children}</div>
          {/* <SidebarMobile isOpen={isOpenMenu} onClose={() => setOpenMenu(false)} /> */}
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  )
}

export const data_promote = [
  {
    id: 76,
    content_type: 3,
    content_path: '/assets/images/banner1.jpeg',
    position: 1,
    link: 'https://twitter.com/shibtoken',
    status: 1,
    start_at: '2022-07-03 14:59:09',
    expire_at: '2023-03-11 14:59:09',
    created_at: '2022-07-03T15:00:33.000000Z',
    updated_at: '2023-02-03T09:15:31.000000Z',
  },
  {
    id: 76,
    content_type: 3,
    content_path: '/assets/images/banner2.webp',
    position: 1,
    link: 'https://twitter.com/pawshibarium',
    status: 1,
    start_at: '2022-07-03 14:59:09',
    expire_at: '2023-03-11 14:59:09',
    created_at: '2022-07-03T15:00:33.000000Z',
    updated_at: '2023-02-03T09:15:31.000000Z',
  },
  {
    id: 76,
    content_type: 3,
    content_path: '/assets/images/banner3.jpeg',
    position: 1,
    link: 'https://twitter.com/realflokiinu',
    status: 1,
    start_at: '2022-07-03 14:59:09',
    expire_at: '2023-03-11 14:59:09',
    created_at: '2022-07-03T15:00:33.000000Z',
    updated_at: '2023-02-03T09:15:31.000000Z',
  },
]
