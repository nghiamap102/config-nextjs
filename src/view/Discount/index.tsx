import { ReactIcon } from "@assets/icon";
import { Box, Checkbox, Divider, Flex } from "@chakra-ui/react";
import UICheckBoxField from "@components/Field/UICheckBoxField";
import Popup from "@components/Popup";
import Translation from "@components/Translate";
import { mainColor } from "@theme/theme";
import { useState } from 'react'


type Props = {

};

const DiscountView = (props: Props) => {

    const [activeVoucher, setActiveVoucher] = useState(false)


    const handleSelectVoucher = () => setActiveVoucher(true)
    const handleCloseSelectVoucher = () => setActiveVoucher(false)

    const handleSelectCoin = () => console.log('abc');

    return (
        <>
            <Flex className="justify-between" px={7} py={5}>
                <Flex className="items-center text-xl">
                    <ReactIcon.IconHi.HiOutlineTicket className="mr-2" color={mainColor.orange} />
                    <Translation type={['common']} text="voucher" className="capitalize" />
                </Flex>

                <Box onClick={handleSelectVoucher} color={mainColor.newTag} className="cursor-pointer">
                    <Translation type={['checkout']} text="select_voucher" className="capitalize" />
                </Box>

                <Popup isOpen={activeVoucher} onClose={handleCloseSelectVoucher} />
            </Flex>

            <Divider w='100%' />

            <Flex className="justify-between" px={7} py={5}>
                <Flex className="items-center text-xl">
                    <ReactIcon.IconBi.BiCoinStack className="mr-2" color={mainColor.hotTag} />
                    <Translation type={['common']} text="coin" className="capitalize" />
                </Flex>
                <Flex>
                    <UICheckBoxField content="[-₫150.000]" onChange={handleSelectCoin} />
                </Flex>
            </Flex>
        </>
    );
};

export default DiscountView