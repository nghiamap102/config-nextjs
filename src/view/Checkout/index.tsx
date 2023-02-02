import { Box, Button, Container, Grid, GridItem } from '@chakra-ui/react'
import CheckoutItem from '@components/Checkout'
import Layout from '@components/Layout'
import Overlay from '@components/Overlay'
import Translation from '@components/Translate'
import { OnApproveActions, OnApproveData } from '@paypal/paypal-js'
import { mainColor } from '@theme/theme'
import DiscountView from '@view/Discount'
import { PaymentView } from '@view/Payment'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'

const CheckoutView: FC = () => {
    const [checkout, setCheckout] = useState<any[]>([])
    const router = useRouter()
    console.log(router.query);
    useEffect(() => {
        Cookies.get('_id_ck') && setTimeout(() => {
            router.push(`/checkout/?state=${JSON.parse(Cookies.get('_id_ck'))}`, undefined, { shallow: true })
        }, 500);
        // JSON.parse(sessionStorage.getItem('checkout'))
        //     ? setCheckout(JSON.parse(sessionStorage.getItem('checkout')))
        //     : 
    }, [])

    const renderTranslate = (text: string) => {
        return (
            <Translation
                className="capitalize"
                text={text}
            />
        )
    }

    const onPayment = () => {
        console.log('abc')
    }
    return (
        <Layout>
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

                {checkout?.length > 0 && checkout?.map(item => <CheckoutItem key={item.product.id} item={item} />)}

                <DiscountView />

                <PaymentView paypalProps={{
                    onApprove: async (data: OnApproveData, actions: OnApproveActions) => {
                        actions.order && await actions.order.capture({}).then((details) => {
                            console.log(details, data);

                        })
                        // const res = await OrderService.createOrder(null)
                        // res && router.push('order')
                    }
                }} />

                <Box className="text-right" p={5}>
                    <Button
                        onClick={onPayment}
                        bg={mainColor.orange}
                        color={mainColor.white}
                        _hover={{ opacity: 0.7 }}
                    >
                        Payment
                    </Button>
                </Box>
            </Container>
            {!router.query.state && (
                <Overlay bg={mainColor.white}>
                    <Box>
                        <HashLoader
                            speedMultiplier={2}
                            color={mainColor.red3}
                            loading={true}
                            size={100}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </Box>
                </Overlay>
            )}
        </Layout>
    )
}

export default CheckoutView
