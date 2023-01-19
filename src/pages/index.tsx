import cartService from '@redux/cart/cartService'
import { setCartList } from '@redux/cart/cartSlice'
import { useAppDispatch } from '@redux/hooks'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import { wrapper } from 'redux/store'
import HomeView from 'view/Home'

const Home: NextPage = props => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        getCart()
    }, [])

    const getCart = async () => {
        const res = await cartService.getCartDetails()
        dispatch(setCartList(res.data))
    }

    return <HomeView products={props?.data?.product} />
}

export const getServerSideProps = wrapper.getServerSideProps(
    () =>
        async ({ locale }) => {
            const res = await fetch(`http://localhost:3030/api/home`)
            const data = await res.json()
            const translate = await serverSideTranslations(locale as string, [
                'common',
                'product',
                'cart',
            ])
            return {
                props: {
                    ...translate,
                    data,
                },
            }
        },
)

export default Home
