import { GameLayout } from '@/components/layouts/GameLayout'
import { RewardPage } from '@/components/pages/reward'
import { NextSeo } from 'next-seo'

const Page = () => {
  return (
    <>
      <NextSeo title="Reward | 0xRace Erc-20" />
      <RewardPage />
    </>
  )
}

Page.Layout = GameLayout

export default Page
