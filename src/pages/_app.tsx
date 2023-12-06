import OverrideMuiTheme from '@/components/wrapper/OverrideMuiTheme'
import ThemeWrapper from '@/components/wrapper/ThemeWrapper'
import { useNextServerSidePropsInterception } from '@/lib/hooks/useNextServerSidePropsInterception'
import { Web3Provider } from '@ethersproject/providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Web3ReactProvider } from '@web3-react/core'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import 'aos/dist/aos.css'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import nProgress from 'nprogress'
import { Fragment, ReactElement, ReactNode, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import store, { persistor } from '../redux/store'

import ForceLandscapeWrapper from '@/components/wrapper/ForceLandscapeWrapper'
import { MarioProvider } from '@/providers/game-provider'
import Aos from 'aos'
import Head from 'next/head'
import '../styles/style.scss'

declare global {
  interface Window {
    aptos: any
  }
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeComplete', nProgress.done)
Router.events.on('routeChangeError', nProgress.done)

export default function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const Layout = Component.Layout ? Component.Layout : Fragment
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {}

  useNextServerSidePropsInterception({
    routes: ['coin/[slug]'],
  })

  function getLibrary(provider: any) {
    return new Web3Provider(provider)
  }

  const chains = [bscTestnet]
  const projectId = '02a231b2406ed316c861abefc95c5e59'

  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  })

  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  useEffect(() => {
    Aos.init({ offset: 0 })
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=1200" user-scalable="0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
      </Head>

      <Web3ReactProvider getLibrary={getLibrary}>
        <WagmiConfig config={wagmiConfig}>
          <Provider store={store}>
            <QueryClientProvider client={new QueryClient()}>
              <PersistGate persistor={persistor}>
                {() => (
                  <MarioProvider>
                    <OverrideMuiTheme>
                      <ThemeWrapper>
                        <ForceLandscapeWrapper>
                          <Layout {...layoutProps}>
                            <Component {...pageProps} />
                          </Layout>
                        </ForceLandscapeWrapper>
                        <Toaster
                          position="bottom-right"
                          toastOptions={{
                            style: {
                              background: '#333',
                              color: '#fff',
                            },
                          }}
                        />
                      </ThemeWrapper>
                    </OverrideMuiTheme>
                  </MarioProvider>
                )}
              </PersistGate>
            </QueryClientProvider>
          </Provider>
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </Web3ReactProvider>
    </>
  )
}
