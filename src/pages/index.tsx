import type { NextPage } from 'next';
import HomePage from 'view/Home';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from 'redux/store';

const Home: NextPage = ({ content }) => {
    return <HomePage />
}

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
    const translate = await serverSideTranslations(locale as string, [
        'common','product'
    ])
    return {
        props: {
            ...translate,
        }
    }
})

export default Home
