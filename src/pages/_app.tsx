import { ApolloProvider } from '@apollo/client'
import { client } from '@common/apolloClient'
import '@styles/globals.scss'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { wrapper } from 'redux/store'
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </>
    )
}


export default wrapper.withRedux(appWithTranslation(MyApp))
