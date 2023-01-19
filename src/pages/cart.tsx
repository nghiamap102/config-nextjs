import cartService from '@redux/cart/cartService'
import { setCartList } from '@redux/cart/cartSlice'
import { useAppDispatch } from '@redux/hooks'
import CartView from '@view/Cart'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import { wrapper } from 'redux/store'

const Cart: NextPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        getCart()
    }, [])

    const getCart = async () => {
        const res = await cartService.getCartDetails()
        dispatch(setCartList(res.data))
    }
    return <CartView />
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

export default Cart
