import { GameLayout } from '@/components/layouts/GameLayout'
import { HomePage } from '@/components/pages/home'
import { NextSeo } from 'next-seo'

const Page = () => {
  return (
    <>
      <NextSeo title="How to play | 0xRace Erc-20" />
      <HomePage />
    </>
  )
}

Page.Layout = GameLayout

export default Page
