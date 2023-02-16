import CheckoutView from '@view/Checkout'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { wrapper } from 'redux/store'
import { useEffect } from 'react'
import { useAppDispatch } from '@redux/hooks'
import { fetchCartList } from '@redux/cart/cartSlice'


const Checkout: NextPage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCartList())
    }, [])
    return <CheckoutView />
}

export const getServerSideProps = wrapper.getServerSideProps(
    () =>
        async ({ locale }) => {
            // const res = await fetch(`http://localhost:3030/api/home`)
            // const data = res.json()
            const translate = await serverSideTranslations(locale as string, ['common'])

            return {
                props: {
                    ...translate,
                    // data
                },
            }
        },
)

export default Checkout
