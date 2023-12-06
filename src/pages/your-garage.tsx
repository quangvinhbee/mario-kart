import { GameMenuLayout } from '@/components/layouts/GameMenuLayout'
import { YourGaragePage } from '@/components/pages/your-garage'
import { NextSeo } from 'next-seo'

const Page = () => {
  return (
    <>
      <NextSeo title="Garage | 0xRace Erc-20" />
      <YourGaragePage />
    </>
  )
}

Page.Layout = GameMenuLayout

export default Page
