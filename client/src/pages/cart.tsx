import CartView from '@view/Cart'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { wrapper } from 'redux/store'

const Cart: NextPage = () => {
    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(fetchCartList())
    // }, [])

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
