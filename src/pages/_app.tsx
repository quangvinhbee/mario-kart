import I18NextWrapper from '@/components/wrapper/I18NextWrapper'
import OverrideMuiTheme from '@/components/wrapper/OverrideMuiTheme'
import ThemeWrapper from '@/components/wrapper/ThemeWrapper'
import { useNextServerSidePropsInterception } from '@/lib/hooks/useNextServerSidePropsInterception'
import { Web3Provider } from '@ethersproject/providers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Web3ReactProvider } from '@web3-react/core'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import 'aos/dist/aos.css'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import nProgress from 'nprogress'
import { Fragment, ReactElement, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import store, { persistor } from '../redux/store'
import { Web3Modal } from '@web3modal/react'

import '../styles/style.scss'
import { MarioProvider } from '@/providers/game-provider'

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

  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <WagmiConfig config={wagmiConfig}>
          <Provider store={store}>
            <QueryClientProvider client={new QueryClient()}>
              <PersistGate persistor={persistor}>
                {() => (
                  <MarioProvider>
                    <OverrideMuiTheme>
                      <ThemeWrapper>
                        <I18NextWrapper>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Layout {...layoutProps}>
                              <Component {...pageProps} />
                            </Layout>
                            <Toaster
                              position="bottom-right"
                              toastOptions={{
                                style: {
                                  background: '#333',
                                  color: '#fff',
                                },
                              }}
                            />
                          </LocalizationProvider>
                        </I18NextWrapper>
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
