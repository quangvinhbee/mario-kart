import { GameLayout } from '@/components/layouts/GameLayout'
import { HowToPlayPage } from '@/components/pages/how-to-play'
import { NextSeo } from 'next-seo'

const Page = () => {
  return (
    <>
      <NextSeo title="How to play | 0xRace Erc-20" />
      <HowToPlayPage />
    </>
  )
}

Page.Layout = GameLayout

export default Page
