import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from 'redux/store';

const Cart: NextPage = () => {
    return <Box>cart</Box>
}

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
    const translate = await serverSideTranslations(locale as string, [
        'common','product','cart'
    ])

    return {
        props: {
            ...translate,
        }
    }
})

export default Cart
