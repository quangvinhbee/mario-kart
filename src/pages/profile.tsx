import { GameLayout } from '@/components/layouts/GameLayout'
import { ProfilePage } from '@/components/pages/profile'
import { NextSeo } from 'next-seo'

const Page = () => {
  return (
    <>
      <NextSeo title="Profile | 0xRace Erc-20" />
      <ProfilePage />
    </>
  )
}

Page.Layout = GameLayout

export default Page
