import { Box, Button, Container, Grid, GridItem } from '@chakra-ui/react'
import CheckoutItem from '@components/Checkout'
import Layout from '@components/Layout'
import Translation from '@components/Translate'
import { OnApproveActions, OnApproveData } from '@paypal/paypal-js'
import { mainColor } from '@theme/theme'
import DiscountView from '@view/Discount'
import { PaymentView } from '@view/Payment'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

const CheckoutView: FC = () => {
    const [checkout, setCheckout] = useState<any[]>([])
    const router = useRouter()

    useEffect(() => {
        JSON.parse(sessionStorage.getItem('checkout'))
            ? setCheckout(JSON.parse(sessionStorage.getItem('checkout')))
            : router.push('/')
    }, [])

    const renderTranslate = (text: string) => {
        return (
            <Translation
                className="capitalize"
                type={['product']}
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
        </Layout>
    )
}

export default CheckoutView
