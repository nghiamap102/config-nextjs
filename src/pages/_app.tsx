import { Box, ChakraProvider } from '@chakra-ui/react'
import Global from '@theme/global'
import theme, { mainColor } from '@theme/theme'
import { gapi } from 'gapi-script'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { CookiesProvider } from 'react-cookie'
import { wrapper } from 'redux/store'
import '../../public/other/nprogress.css'
import './_app.css'
import '@styles/globals.scss'
import ProgressBar from '@components/ProgressBar'

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()

    useEffect(() => {
        decodeScript()
    }, [])

    useEffect(() => {
        NProgress.configure({ showSpinner: false })
        NProgress.inc(0.4)
        const handleStart = () => NProgress.start()
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

    const decodeScript = () => {
        const initClient = async () => {
            gapi.client.init({
                clientId: process.env.CLIENT_ID,
                scope: '',
            })
        }
        gapi.load('client:auth2', initClient)
    }

    return (
        <>
            <CookiesProvider>
                <ChakraProvider theme={theme}>
                    <Global />
                    <Box bg={mainColor.gray} color="#000" minHeight="100vh">
                        <ProgressBar />
                        <Component {...pageProps} />
                    </Box>
                </ChakraProvider>
            </CookiesProvider>
        </>
    )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
