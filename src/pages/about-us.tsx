import { GameLayout } from '@/components/layouts/GameLayout'
import { AboutUsPage } from '@/components/pages/about-us'
import { NextSeo } from 'next-seo'

const Page = () => {
  return (
    <>
      <NextSeo title="About Us | 0xRace Erc-20" />
      <AboutUsPage />
    </>
  )
}

Page.Layout = GameLayout

export default Page
