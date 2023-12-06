import { GameMenuLayout } from '@/components/layouts/GameMenuLayout'
import { SpinRacePage } from '@/components/pages/spin-race'
import { NextSeo } from 'next-seo'

const Page = () => {
  return (
    <>
      <NextSeo title="Spin race | 0xRace Erc-20" />
      <SpinRacePage />
    </>
  )
}

Page.Layout = GameMenuLayout

export default Page
