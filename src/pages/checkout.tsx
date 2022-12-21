import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from 'redux/store';
import HomePage from 'view/Home';

const Checkout: NextPage = () => {
    return <HomePage />
}

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
    const translate = await serverSideTranslations(locale as string, [
        'common', 'product', 'cart'
    ])

    return {
        props: {
            ...translate,
        }
    }
})

export default Checkout
