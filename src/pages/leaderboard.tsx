import { GameLayout } from '@/components/layouts/GameLayout'
import { Leaderboard } from '@/components/pages/leaderboard'
import { NextSeo } from 'next-seo'

const Page = () => {
  return (
    <>
      <NextSeo title="Leaderboard | 0xRace Erc-20" />
      <Leaderboard />
    </>
  )
}

Page.Layout = GameLayout

export default Page
