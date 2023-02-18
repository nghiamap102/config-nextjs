import { ReactIcon } from "@assets/icon";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { ButtonPrimary } from "@components/Button";
import ModalAddress from "@components/Modal/ModalAddress";
import Translation from "@components/Translate";
import { fetchAddress, selectAuth } from "@redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { mainColor } from "@theme/theme";
import { useSession } from "next-auth/react";
import { FC, useEffect } from "react";
import AddressItem from "./AddressItem";
import { sortAddress } from "@utils/helper";

type AddressViewProps = {
    user?: any
};

const AddressView: FC<AddressViewProps> = ({ user }) => {

    const dispatch = useAppDispatch()
    const { data } = useSession()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const authState = useAppSelector(selectAuth)

    useEffect(() => {
        data.user && dispatch(fetchAddress(data.user._id))
    }, [])


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
                {sortAddress(authState.address)?.map((item, index) => (
                    <AddressItem item={item} key={item._id} />
                ))}
            </Box>
            <ModalAddress size='xl' isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};

export default AddressView