import { DefaultSeo } from 'next-seo'
import SEO from '@/configs/next-seo.config'
import Head from 'next/head'
import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import { RECAPTCHA_SITE_KEY } from '@/configs/app'

export const initGA = () => {
  ReactGA.initialize('G-Q7S27QH3TL')
}

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export function DefaultHead(props: any) {
  const { coin } = props
  useEffect(() => {
    initGA()
    logPageView()
  }, [])
  return (
    <>
      <Head>
        <title>
          {coin?.name
            ? coin?.name +
              `${Number(coin?.change24h) < 0 ? ' ▼' : ' ▲'}` +
              coin?.change24h +
              '% ' +
              ' | XSpace - The best platform for crypto investors'
            : `XSpace - The best platform for crypto investors`}
        </title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=0 "
        />
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src *;
                        img-src * 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *;
                        style-src  'self' 'unsafe-inline' *"
        ></meta>
        <meta name="image" content={coin?.logo ? coin?.logo : '/xspace.jpg'} />
        <meta name="og:image" content={coin?.logo ? coin?.logo : '/xspace.jpg'} />
        <meta
          name="description"
          content={
            coin?.description
              ? coin?.description
              : 'Xspace provides coin ranking and statistics services, trading bots, marketing, web3 development and blockchain services to help both investors and project builders make money together.'
          }
        />
        <meta
          name="og:description"
          content={
            coin?.description
              ? coin?.description
              : 'Xspace provides coin ranking and statistics services, trading bots, marketing, web3 development and blockchain services to help both investors and project builders make money together.'
          }
        />
        <link rel="icon" type="image/png" href={'/favicon.png'} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-C1XSY0XQM3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-C1XSY0XQM3');
             `,
          }}
        />

        {/* <script
          type="text/javascript"
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
        /> */}
      </Head>
    </>
  )
}

export default DefaultHead
