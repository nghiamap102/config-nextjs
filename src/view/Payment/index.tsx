import { Box, Flex } from "@chakra-ui/react"
import PaypalButton from "@components/Button/PaypalButton"
import SelectItem from "@components/SelectItem"
import Translation from "@components/Translate"
import { PayPalButtonsComponentProps } from "@paypal/react-paypal-js"
import classNames from "classnames"
import { FC, useState, useMemo } from 'react'

type PaymentView = {
    paypalProps : PayPalButtonsComponentProps
}

export const PaymentView: FC<PaymentView> = ({ paypalProps }) => {

    const paymentMethod = [
        {
            method: 'cash',
            description: 'Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.'
        },
        {
            method: 'momo',
            description: 'momo'
        },
        {
            method: 'paypal',
            description: 'paypal'
        }
    ]


    const [payment, setPayment] = useState<any>({})

    const handleSelect = (items: any) => setPayment(items)

    const renderMethod = () => {

        switch (payment.method) {
            case 'paypal':
                return <PaypalButton {...paypalProps}/>
            default:
                return ''
        }
    }


    return (
        <Box px={7} py={5}>
            <Flex className="items-center" mb={3}>
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
                        {items.description}
                        {renderMethod()}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default PaymentView
