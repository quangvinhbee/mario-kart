import { GameLayout } from '@/components/layouts/GameLayout'
import { PlayPage } from '@/components/pages/play'
import { NextSeo } from 'next-seo'

const Page = () => {
  return (
    <>
      <NextSeo title="0xRace Erc-20" />
      <PlayPage />
    </>
  )
}

Page.Layout = GameLayout

export default Page
