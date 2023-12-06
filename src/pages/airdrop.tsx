import { GameMenuLayout } from '@/components/layouts/GameMenuLayout'
import { AirdropPage } from '@/components/pages/airdrop'
import { NextSeo } from 'next-seo'

const Page = () => {
  return (
    <>
      <NextSeo title="Airdrop | 0xRace Erc-20" />
      <AirdropPage />
    </>
  )
}

Page.Layout = GameMenuLayout

export default Page
