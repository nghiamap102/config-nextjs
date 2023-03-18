import { Container, Grid, GridItem } from '@chakra-ui/react'
import CheckoutItem from '@components/Items/CheckoutItem'
import Layout from '@components/Layout'
import Overlay from '@components/Overlay'
import Translation from '@components/Translate'
import { ICartItem } from '@redux/cart/cartModel'
import { fetchCheckout, selectCheckout, updateCheckoutItem } from '@redux/checkout/checkoutSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { selectOrder } from '@redux/order/orderSlice'
import { mainColor } from '@theme/theme'
import DiscountView from '@view/Discount'
import { PaymentView } from '@view/Payment'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { HashLoader } from 'react-spinners'
import CheckoutSucess from './CheckoutSucess'

const CheckoutView: FC = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const checkoutState = useAppSelector(selectCheckout)
    const orderState = useAppSelector(selectOrder)

    useEffect(() => {
        Cookies.get('_id_ck') && setTimeout(() => {
            router.push(`/checkout/?state=${JSON.parse(Cookies.get('_id_ck'))}`, undefined, { shallow: true })
            dispatch(fetchCheckout(JSON.parse(Cookies.get('_id_ck'))))
        }, 1000);
    }, [])

    const renderTranslate = (text: string) => <Translation className="capitalize" text={text} />

    const handleChangeDescription = (item: ICartItem, value: string) => {
        const newItem: ICartItem = { ...item, description: value }
        dispatch(updateCheckoutItem(newItem))
    }
    console.log(checkoutState.list)
    const renderUI = () => {

        if (orderState.success) {
            return <CheckoutSucess />
        } else {
            return (
                <Container my={5} bg={mainColor.white} maxW="container.xl" p={0}>
                    <Grid templateColumns="repeat(12, 1fr)" px={7} py={5}>
                        <GridItem colSpan={5} fontSize="xl">
                            {renderTranslate('items')}
                        </GridItem>
                        <GridItem colSpan={3} />
                        <GridItem
                            colSpan={1}
                            color={mainColor.gray2}
                            className="font-medium"
                        >
                            {renderTranslate('unit_price')}
                        </GridItem>
                        <GridItem
                            colSpan={1}
                            color={mainColor.gray2}
                            className="text-center"
                        >
                            {renderTranslate('quantity')}
                        </GridItem>
                        <GridItem
                            colSpan={2}
                            color={mainColor.gray2}
                            className="text-right"
                        >
                            {renderTranslate('total')}
                        </GridItem>
                    </Grid>

                    {checkoutState.list?.items?.map(item => (
                        <CheckoutItem handleChangeDescription={handleChangeDescription} key={item.product?._id} item={item} />
                    ))}

                    <DiscountView />

                    <PaymentView />

                </Container>
            )
        }
    }

    return (
        <Layout>
            {renderUI()}
            {checkoutState.list && Object.keys(checkoutState.list).length < 1 && (
                <Overlay bg={mainColor.white}>
                    <HashLoader
                        speedMultiplier={2}
                        color={mainColor.red3}
                        loading={true}
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </Overlay>
            )}
        </Layout>
    )
}

export default CheckoutView
