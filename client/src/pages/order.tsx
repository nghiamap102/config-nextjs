import OrderView from '@view/Order'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import { wrapper } from 'redux/store'

const Order: NextPage = () => {
    // const dispatch = useAppDispatch()

    useEffect(() => {
        // dispatch(fetchOrderList())
    }, [])

    return <OrderView />
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

export default Order
