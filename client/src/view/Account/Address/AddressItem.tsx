import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Tag from "@components/Tag";
import Translation from "@components/Translate";
import { CHANGE_ADDRESS_DEFAULT } from "@redux/auth/authAction";
import { IAddress } from "@redux/auth/authModel";
import { changeAddressDefaultSuccess } from "@redux/auth/authSlice";
import { useAppDispatch } from "@redux/hooks";
import { mainColor } from "@theme/theme";
import { FC } from "react";
import { formatPhoneNumber } from 'react-phone-number-input';

type AddressItemProps = {
    item: IAddress
    edit?: boolean
    select?: boolean
    onSelect?: () => void
}

const AddressItem: FC<AddressItemProps> = ({
    item,
    edit = true,
    select = false,
    onSelect,
}) => {
    const dispatch = useAppDispatch()

    const handleSetDefault = (address: IAddress) => {
        dispatch({ type: CHANGE_ADDRESS_DEFAULT, payload: { ...address, default: true } })
    }

    return (
        <Flex py={5} className="justify-between py-5" borderBottom={`1px solid ${mainColor.gray4}`}>
            <Box>
                <Flex className="items-center">
                    <Text className="text-lg font-normal " mr={3} pr={3} borderRight={`1px solid ${mainColor.gray4}`}>{item.name}</Text>
                    <Text className="text-md" color={mainColor.gray2}>
                        {formatPhoneNumber(item.phone) || `+${item.phone}`}
                    </Text>
                    <Tag className="inline-block my-2 px-2" color={mainColor.orange}>
                        <Translation text={item.address_name} firstCapital />
                    </Tag>
                </Flex>
                <Flex color={mainColor.gray3}>{item.location?.no}</Flex>
                <Flex color={mainColor.gray3}>{item.location?.province?.name}, {item.location?.district?.name}, {item.location?.ward?.name}</Flex>
                {item.default && (
                    <Tag border={`1px solid ${mainColor.red}`} mx={0} className="inline-block my-2 px-2" color={mainColor.red}>
                        <Translation text="default" firstCapital />
                    </Tag>
                )}
            </Box>
            <Box>
                {edit && (
                    <Box>
                        <Flex mb={2}>
                            <Button variant='ghost' size='sm' colorScheme="blue" fontWeight={400}><Translation text="update" firstCapital /></Button>
                            <Button variant='ghost' size='sm' colorScheme="blue" fontWeight={400}><Translation text="delete" firstCapital /></Button>
                        </Flex>
                        <Button variant='outline' fontWeight={400} onClick={() => handleSetDefault(item)}>
                            <Translation text="set_as_default" firstCapital />
                        </Button>
                    </Box>
                )}
                {select && (
                    <Button variant='outline' onClick={onSelect}>
                        <Translation text="select" firstCapital />
                    </Button>
                )}
            </Box>
        </Flex>
    );
};
export default AddressItem