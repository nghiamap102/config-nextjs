import { Box, Button, Flex, Text } from "@chakra-ui/react"
import PaypalButton from "@components/Button/PaypalButton"
import SelectItem from "@components/Items/SelectItem"
import Translation from "@components/Translate"
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData, OrderResponseBody } from "@paypal/paypal-js"
import { selectCheckout } from "@redux/checkout/checkoutSlice"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { DataOrder, DataOrderItem } from "@redux/order/orderModel"
import { createOrder } from "@redux/order/orderSlice"
import { mainColor } from "@theme/theme"
import classNames from "classnames"
import { paymentStatus } from "contants/common"
import { FC, useState } from 'react'

export const PaymentView: FC = () => {

    const dispatch = useAppDispatch()
    const checkoutState = useAppSelector(selectCheckout)
    const paymentMethod = [
        {
            method: 'cash',
            description: 'Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.'
        },
        {
            method: 'momo',
            description: ''
        },
        {
            method: 'paypal',
            description: ''
        }
    ]
    const [payment, setPayment] = useState<any>(paymentMethod[0])
    const handleSelect = (items: any) => setPayment(items)

    const renderTotal = () => {
        return checkoutState.list && checkoutState.list?.items?.reduce((init, item) => init + item.quantity * item.product_sample?.unit_price, 0) || 0
    }

    const Orders: any = checkoutState.list && checkoutState.list?.items?.map(items => {
        return {
            description: items.description || '',
            quantity: items.quantity,
            sample_id: items.product_sample?._id,
            total: items.product_sample?.unit_price && items.quantity && items.quantity * items.product_sample?.unit_price
        }
    })

    const renderOrder = (status?: string, coin?: number) => {
        return {
            payment_method: payment.method,
            status: status || paymentStatus.PENDING,
            coin: coin || 0,
            orders: Orders
        }
    }

    const renderMethod = () => {
        switch (payment.method) {
            case 'paypal':
                return <PaypalButton
                    createOrder={(data: CreateOrderData, actions: CreateOrderActions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: renderTotal().toString(),
                                },
                            }],
                        });
                    }}
                    onApprove={async (data: OnApproveData, actions: OnApproveActions) => {
                        actions.order && await actions.order.capture({}).then((details: OrderResponseBody) => {
                            dispatch(createOrder(renderOrder(
                                details.purchase_units[0]?.payments && details.purchase_units[0]?.payments?.captures && details.purchase_units[0]?.payments?.captures[0]?.status,
                            )))
                        })
                    }}
                />
            default:
                return ''
        }
    }

    const onPayment = () => {
        dispatch(createOrder(renderOrder(paymentStatus.PENDING)))
    }

    return (
        <Box px={7} py={5}>
            <Flex className="items-center" mb={5}>
                <Translation type={['common']} text="payment_method" className="mr-10 text-xl capitalize" />
                <Flex>
                    {paymentMethod.map(items => (
                        <SelectItem key={items.method} mx={2} selected={payment?.method === items.method} onSelect={() => handleSelect(items)}>
                            {items.method}
                        </SelectItem>
                    ))}
                </Flex>
            </Flex>
            <Box>
                {paymentMethod.map(items => (
                    <Box key={items.method} className={classNames(payment.method === items.method ? 'fade-up' : 'hidden')}>
                        <Text my={3}>{items.description}</Text>
                        {renderMethod()}
                    </Box>
                ))}
            </Box>
            {payment.method === 'cash' && (
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
            )}
        </Box>
    )
}

export default PaymentView
