import { GameMenuLayout } from '@/components/layouts/GameMenuLayout'
import { UpgradePage } from '@/components/pages/upgrade'
import { NextSeo } from 'next-seo'

const Page = () => {
  return (
    <>
      <NextSeo title="Upgrade | 0xRace Erc-20" />
      <UpgradePage />
    </>
  )
}

Page.Layout = GameMenuLayout

export default Page
