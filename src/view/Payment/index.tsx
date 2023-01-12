import { Box, Flex } from "@chakra-ui/react"
import SelectItem from "@components/SelectItem"
import Translation from "@components/Translate"
import classNames from "classnames"
import { FC, useState, useMemo } from 'react'


export const PaymentView: FC = () => {


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


    const [method, setMethod] = useState<any>({})

    return (
        <Box px={7} py={5}>
            <Flex className="items-center" mb={3}>
                <Translation type={['common']} text="payment_method" className="mr-10 text-xl capitalize" />
                <Flex>
                    {paymentMethod.map(items => (
                        <SelectItem key={items.method} mx={2} selected={method?.method === items.method} onSelect={() => setMethod(items)}>
                            {items.method}
                        </SelectItem>
                    ))}
                </Flex>
            </Flex>
            <Box>
                {paymentMethod.map(items => (
                    <Box key={items.method} className={classNames(method.method === items.method ? 'fade-up' : 'hidden')}>
                        {items.description}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default PaymentView
