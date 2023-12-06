import { GameMenuLayout } from '@/components/layouts/GameMenuLayout'
import { StakePage } from '@/components/pages/stake'
import { NextSeo } from 'next-seo'

const Page = () => {
  return (
    <>
      <NextSeo title="Stake | 0xRace Erc-20" />
      <StakePage />
    </>
  )
}

Page.Layout = GameMenuLayout

export default Page
