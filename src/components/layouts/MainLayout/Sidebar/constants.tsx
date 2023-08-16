import { FaFacebook, FaGlobe, FaTelegram, FaTelegramPlane, FaTwitter } from 'react-icons/fa'

export const MENUS = [
  {
    label: 'Start',
    labelPosition: 'top',
    onlyShowOnActive: false,
    icon: '/assets/main-layout/ic-sidebar-1.png',
    iconActive: '/assets/main-layout/ic-sidebar-1-active.png',
    path: '/',
  },
  {
    label: 'arcade era',
    labelPosition: 'bottom',
    onlyShowOnActive: true,
    icon: '/assets/main-layout/ic-sidebar-2.png',
    iconActive: '/assets/main-layout/ic-sidebar-2-active.png',
    children: [
      {
        label: 'Donkey kong',
        path: '/donkey-kong',
      },
      {
        label: 'Mario bros',
        path: '/mario-bros',
      },
    ],
  },
  {
    label: '8 bit era',
    labelPosition: 'bottom',
    onlyShowOnActive: true,
    icon: '/assets/main-layout/ic-sidebar-3.png',
    iconActive: '/assets/main-layout/ic-sidebar-3-active.png',
    children: [
      {
        label: 'Super mario bros',
        path: '/super-mario-bros',
      },
      {
        label: 'Super mario bros 2',
        path: '/super-mario-bros-2',
      },
      {
        label: 'Super mario bros 3',
        path: '/super-mario-bros-3',
      },
      {
        label: 'Handhelds',
        path: '/handhelds',
      },
    ],
  },
  {
    label: '16 bit era',
    labelPosition: 'bottom',
    onlyShowOnActive: true,
    icon: '/assets/main-layout/ic-sidebar-4.png',
    iconActive: '/assets/main-layout/ic-sidebar-4-active.png',
    children: [
      {
        label: 'Super mario world',
        path: '/super-mario-world',
      },
      {
        label: 'Yoshis island',
        path: '/yoshis-island',
      },
      {
        label: 'Super mario kart',
        path: '/super-mario-kart',
      },
    ],
  },
  {
    label: '3d era',
    labelPosition: 'bottom',
    onlyShowOnActive: true,
    icon: '/assets/main-layout/ic-sidebar-5.png',
    iconActive: '/assets/main-layout/ic-sidebar-5-active.png',
    children: [
      {
        label: 'Super mario 64',
        path: '/super-mario-64',
      },
      {
        label: 'Super mario sunshine',
        path: '/super-mario-sunshine',
      },
      {
        label: 'Super smash bros',
        path: '/super-smash-bros',
      },
      {
        label: 'Super mario galaxy',
        path: '/super-mario-galaxy',
      },
    ],
  },
  {
    label: 'modern era',
    labelPosition: 'bottom',
    onlyShowOnActive: true,
    icon: '/assets/main-layout/ic-sidebar-6.png',
    iconActive: '/assets/main-layout/ic-sidebar-6-active.png',
    children: [
      {
        label: 'Super mario bros Wii&WiiU',
        path: '/super-mario-bros-Wii&WiiU',
      },
      {
        label: 'Super mario 3D world',
        path: '/super-mario-3D-world',
      },
    ],
  },
  {
    label: 'Finish',
    labelPosition: 'bottom',
    onlyShowOnActive: false,
    icon: '/assets/main-layout/ic-sidebar-7.png',
    iconActive: '/assets/main-layout/ic-sidebar-7-active.png',
    path: '/finish',
  },
]

export const SOCIAL_ICON = [
  {
    icon: <FaTwitter />,
    path: 'https://twitter.com/xspacefi/',
  },
  {
    icon: <FaFacebook />,
    path: 'https://www.facebook.com/xspaceglobal',
  },
  {
    icon: <FaTelegramPlane />,
    path: 'https://t.me/xspacefi',
  },

  // {
  //   icon: <FaDiscord />,
  //   path: '',
  // },

  // {
  //   path: 'https://t.me/xspacefi_listing',
  //   label: 'Listing Alert',
  //   icon: <BsTelegram />,
  // },
  {
    path: 'https://t.me/xspacefi_global',
    label: 'Chat',
    icon: <FaTelegram />,
  },
  {
    path: 'https://xspace.fi',
    label: 'Home',
    icon: <FaGlobe />,
  },
]
