import { GameMenuLayout } from '@/components/layouts/GameMenuLayout'
import { MarketplacePage } from '@/components/pages/marketplace'
import { NextSeo } from 'next-seo'

const Page = () => {
  return (
    <>
      <NextSeo title="Marketplace | 0xRace Erc-20" />
      <MarketplacePage />
    </>
  )
}

Page.Layout = GameMenuLayout

export default Page
