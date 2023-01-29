import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { wrapper } from 'redux/store'
import HomeView from 'view/Home'

const Home: NextPage = props => {

    return <HomeView />
}

export const getServerSideProps = wrapper.getServerSideProps(
    () =>
        async ({ locale }) => {
            const translate = await serverSideTranslations(locale as string, ['common'])
            return {
                props: {
                    ...translate,
                },
            }
        },
)

export default Home
