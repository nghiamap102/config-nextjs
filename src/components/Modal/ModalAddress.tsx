import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalProps, Text } from "@chakra-ui/react";
import AutoComplete from "@components/AutoComplete";
import { ButtonPrimary } from "@components/Button";
import UICheckBoxField from "@components/Field/UICheckBoxField";
import Translation from "@components/Translate";
import { CREATE_ADDRESS } from "@redux/auth/authAction";
import { IAddress } from "@redux/auth/authModel";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { ProvinceModel } from "models/common";
import { useSession } from "next-auth/react";
import { ChangeEvent, FC, useState } from "react";
import PhoneInput from 'react-phone-number-input/input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { mainColor } from "@theme/theme";
import { debounce } from "lodash";
import { selectAuth } from "@redux/auth/authSlice";

type ModalAddressProps = {

} & ModalProps


const ModalAddress: FC<ModalAddressProps> = ({ ...props }) => {

    const { data } = useSession()
    const dispatch = useAppDispatch()
    const authState = useAppSelector(selectAuth)
    const [err, setErr] = useState('')
    const initAddress = {
        name: '',
        default: false,
        address_name: '',
        location: {},
        phone: ''
    }
    const [address, setAddress] = useState<IAddress>(initAddress)

    const handleSelectProvince = (province: ProvinceModel) => {
        setAddress({ ...address, location: { ...address.location, province } })
    }
    const handleSelectDistrict = (district: ProvinceModel) => {
        setAddress({ ...address, location: { ...address.location, district } })
    }
    const handleSelectWard = (ward: ProvinceModel) => {
        setAddress({ ...address, location: { ...address.location, ward } })
    }

    const handleRemoveLocation = () => setAddress({ ...address, location: {} })

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const { value: name } = event.target
        setAddress({ ...address, name })
    }

    const handleChangePhone = (phone = '') => {
        if (isPossiblePhoneNumber(phone)) {
            setAddress({ ...address, phone })
            setErr('')
        } else {
            setErr('invalid phone number')
        }
    }


    const handleChangeAddressName = (event: ChangeEvent<HTMLInputElement>) => {
        const { value: address_name } = event.target
        setAddress({ ...address, address_name })
    }

    const handleChangeAddressNo = (event: ChangeEvent<HTMLInputElement>) => {
        const { value: no } = event.target
        setAddress({ ...address, location: { ...address.location, no } })
    }

    const handleSelectDefault = () => {
        setAddress({ ...address, default: !address.default })
    }
    const handleCreateAddress = () => {
        dispatch({ type: CREATE_ADDRESS, payload: { ...address, user_id: data?.user._id } })
        props.onClose()
        setAddress(initAddress)
    }

    return (
        <Modal {...props}>
            <ModalOverlay />
            <ModalContent >
                <ModalHeader>New Address</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Box minH={400}>
                        <Flex>
                            <Input placeholder="Full name" className="mr-4" onChange={handleChangeName} />

                            <Flex className="flex-col w-full">
                                <PhoneInput className='chakra-input css-1kp110w' value={address.phone} onChange={debounce(handleChangePhone, 500)} placeholder="Enter phone number" name="phoneNumber" />
                                <Text color={mainColor.red} className="pl-2 mt-2 capitalize">
                                    {err}
                                </Text>
                            </Flex>
                        </Flex>

                        <FormControl my={3}>
                            <FormLabel><Translation text="address_no" className="capitalize" /></FormLabel>
                            <Input placeholder="Address No" onChange={handleChangeAddressNo} />
                        </FormControl>

                        <AutoComplete
                            address={address.location}
                            handleRemoveLocation={handleRemoveLocation}
                            handleSelectProvince={handleSelectProvince}
                            handleSelectDistrict={handleSelectDistrict}
                            handleSelectWard={handleSelectWard}
                        />

                        <FormControl my={3}>
                            <FormLabel><Translation text="address_name" firstCapital /></FormLabel>
                            <Input placeholder="Address name" onChange={handleChangeAddressName} />
                        </FormControl>
                        <UICheckBoxField disable={authState.address?.some(item => item.default)} active={address.default} content="set_as_default_address" onClick={handleSelectDefault} />
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <ButtonPrimary mr={3} onClick={handleCreateAddress}> Apply </ButtonPrimary>
                    <Button variant='ghost' onClick={props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalAddress