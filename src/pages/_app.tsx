import '@styles/globals.scss'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { wrapper } from 'redux/store'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
