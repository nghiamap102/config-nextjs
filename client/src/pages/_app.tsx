import { Box, ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import ProgressBar from '@components/ProgressBar'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import '@styles/globals.scss'
import Global from '@theme/global'
import theme, { mainColor } from '@theme/theme'
import { API_URL_BE, paypalScriptOptions } from 'contants/common'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { createContext, useEffect } from 'react'
import { wrapper } from 'redux/store'
import { io } from 'socket.io-client'
import '../../public/other/nprogress.css'
import './_app.css'
export const SocketContext = createContext<any>(null)

function MyApp({ Component, pageProps }: AppProps) {
    const { ToastContainer } = createStandaloneToast()
    const router = useRouter()
    useEffect(() => {
        NProgress.configure({ showSpinner: false })

        const handleStart = () => {
            NProgress.start()
            NProgress.inc(0.4)
            NProgress.configure({ easing: 'ease', speed: 500 })
        }
        const handleStop = () => NProgress.done()

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)
        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router])

    return (
        <SessionProvider session={pageProps.session}>
            <PayPalScriptProvider options={paypalScriptOptions}>
                <SocketContext.Provider value={io(API_URL_BE)}>
                    <ChakraProvider theme={theme}>
                        <ToastContainer />
                        <Global />
                        <Box bg={mainColor.gray} color="#000" minHeight="100vh">
                            <ProgressBar />
                            <Component {...pageProps} />
                        </Box>
                    </ChakraProvider>
                </SocketContext.Provider>
            </PayPalScriptProvider>
        </SessionProvider>
    )
}

export default wrapper.withRedux(appWithTranslation(MyApp))