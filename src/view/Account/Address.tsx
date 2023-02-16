import { ReactIcon } from "@assets/icon";
import { Box, Button, Flex, Input, Text, useDisclosure } from "@chakra-ui/react";
import AutoComplete from "@components/AutoComplete";
import { ButtonPrimary } from "@components/Button";
import Popup from "@components/Popup";
import Translation from "@components/Translate";
import { mainColor } from "@theme/theme";
import { FC } from "react";

type AddressViewProps = {
    user?: any
};
const AddressView: FC<AddressViewProps> = ({ user }) => {


    const { isOpen, onClose, onOpen } = useDisclosure()

    const handleOpenPopup = () => {
        console.log('ac')
    }

    return (
        <Box bg={mainColor.white} h='100%'>
            <Flex className="justify-between" px={8} py={5} borderBottom={`1px solid ${mainColor.gray4}`}>
                <Translation text="my_address" fontSize='2xl' firstCapital />
                <ButtonPrimary onClick={onOpen}>
                    <ReactIcon.IconAi.AiOutlinePlus className="mr-2" />
                    <Translation text="add_new_address" firstCapital />
                </ButtonPrimary>
            </Flex>

            <Box px={8}>
                {Array(6).fill(null).map((item, index) => (
                    <Flex key={index} py={5} className="justify-between py-5" borderBottom={`1px solid ${mainColor.gray4}`}>
                        <Box>
                            <Flex className="items-center">
                                <Text className="text-lg font-normal " mr={3} pr={3} borderRight={`1px solid ${mainColor.gray4}`}>Nghĩa Hoàng</Text>
                                <Text className="text-md" color={mainColor.gray2}>(+84) 368921284</Text>
                            </Flex>
                            <Flex color={mainColor.gray3}>25/33 Đoàn Giỏi</Flex>
                            <Flex color={mainColor.gray3}>Phường Sơn Kỳ, Quận Tân Phú, TP. Hồ Chí Minh</Flex>
                        </Box>
                        <Box>
                            <Flex mb={2}>
                                <Button variant='ghost' size='sm' colorScheme="blue" fontWeight={400}><Translation text="update" firstCapital /></Button>
                                <Button variant='ghost' size='sm' colorScheme="blue" fontWeight={400}><Translation text="delete" firstCapital /></Button>
                            </Flex>
                            <Button variant='outline' fontWeight={400}>
                                <Translation text="set_as_default" />
                            </Button>
                        </Box>
                    </Flex>
                ))}
            </Box>
            <Popup
                isOpen={isOpen}
                size='xl'
                title="New Address"
                onClose={onClose}
            >
                <Box minH={400}>
                    <Flex>
                        <Input
                            placeholder="Full name"
                            className="mr-4"
                        />
                        <Input
                            placeholder="Phone"
                        />
                    </Flex>
                    <AutoComplete />
                </Box>
            </Popup>
        </Box>
    );
};

export default AddressView