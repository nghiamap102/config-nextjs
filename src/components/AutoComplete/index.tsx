import { ReactIcon } from "@assets/icon";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { API_ENDPOINT } from "@common/apiEndpoint";
import Translation from "@components/Translate";
import { mainColor } from "@theme/theme";
import axios from "axios";
import { ProvinceModel } from "models/common";
import { FC, useEffect, useRef, useState } from "react";

type AutoCompleteProps = {
    address?: any
    handleSelectCity?: (city: ProvinceModel) => void
    handleSelectDistrict?: (district: ProvinceModel) => void
    handleSelectWard?: (ward: ProvinceModel) => void
    handleRemoveLocation?: () => void
};
type AddressData = {
    city?: ProvinceModel[]
    district?: ProvinceModel[]
    ward?: ProvinceModel[]
}

const AutoComplete: FC<AutoCompleteProps> = ({
    address,
    handleRemoveLocation,
    handleSelectCity,
    handleSelectDistrict,
    handleSelectWard,
}) => {

    const [focus, setFocus] = useState(false)
    const inputRef = useRef<any>()

    const handleClick = (e) => {
    }


    const renderAddress = () => {
        if (address.city?.name && !address.district?.name) return address.city?.name
        if (address.city?.name && address.district?.name && !address.ward?.name) return `${address.city?.name}, ${address.district?.name}`
        if (address.city?.name && address.district?.name && address.ward?.name) return `${address.city?.name}, ${address.district?.name}, ${address.ward?.name}`
        return ''
    }
    const handleChangeInput = () => {
    }

    return (
        <Flex my={5} px={3} py={2} className="autocomplete justify-between relative" border={`1px solid ${focus ? mainColor.black : mainColor.gray2}`}
            borderRadius='lg'
            onAuxClick={() => console.log('ac')}
            onClick={handleClick}
            transition={'0.3s border-color'}
        >
            <input
                type="text" placeholder="City, District, Ward" style={{ width: '100%', outline: 'none', border: 'none' }}
                ref={inputRef} value={renderAddress()}
                className="pr-2"
                onFocus={() => setFocus(true)}
                onChange={handleChangeInput}
            />
            <Flex className="items-center ">
                {focus && !address.city && <ReactIcon.IconAi.AiOutlineSearch size='1.5rem' className="mr-2" />}
                {focus && address.city && <ReactIcon.IconGr.GrFormClose size='1.5rem' className="mr-2" onClick={handleRemoveLocation} />}
                <ReactIcon.IconGo.GoTriangleDown color={mainColor.gray2} />
            </Flex>
            {focus && !address.ward && <Suggesstion
                address={address}
                handleSelectCity={handleSelectCity}
                handleSelectDistrict={handleSelectDistrict}
                handleSelectWard={handleSelectWard}
            />}
        </Flex>
    );
}

type SuggesstionProps = {
    handleSelectCity: any
    handleSelectDistrict: any
    handleSelectWard: any
    address: any
}
const Suggesstion: FC<SuggesstionProps> = ({
    handleSelectCity,
    handleSelectDistrict,
    handleSelectWard,
    address,
}) => {
    const [dataAddress, setDataAddress] = useState<AddressData>({
        city: [],
        district: [],
        ward: []
    })

    useEffect(() => {
        fetchProvince()
    }, [])

    const fetchProvince = async () => {
        const city = await (await axios.get(API_ENDPOINT.PROVINCE)).data
        const district = await (await axios.get(API_ENDPOINT.DISTRICTS)).data
        const ward = await (await axios.get(API_ENDPOINT.WARD)).data
        setDataAddress({ city, district, ward })
    }

    const renderLoading = () => {
        if (dataAddress.city?.length < 1 && dataAddress.district.length < 1 && dataAddress.ward?.length < 1) {
            return (
                <Flex className="items-center justify-center my-10">
                    <Spinner size='xl' />
                </Flex>
            )
        }
    }

    const renderArrayProvince = () => {
        if (!address.city) {
            return dataAddress.city?.map((item) => (
                <Item key={item.codename} item={item} onClick={() => handleSelectCity(item)} />
            ))
        } else if (!address.district && address.city) {
            return dataAddress.district?.map((item, index) => (
                <Item key={index} item={item} onClick={() => handleSelectDistrict(item)} />
            ))
        }
        // use infinite prevent loading so much element
        else if (!address.ward && address.district && address.city) {
            return dataAddress.ward?.map((item, index) => (
                <Item key={index} item={item} onClick={() => handleSelectWard(item)} />
            ))
        }
    }

    return (
        <Flex w='100%' className="flex-col absolute left-0" top='115%'
            zIndex={2}
            bg={mainColor.white}
            border={`1px solid ${mainColor.gray2}`}
        >
            <Flex >
                <Box flex={1} py={3} className="text-center">
                    <Translation text="city" firstCapital />
                </Box>

                <Box flex={1} py={3} className="text-center">
                    <Translation text="district" firstCapital />
                </Box>

                <Box flex={1} py={3} className="text-center">
                    <Translation text="ward" firstCapital />
                </Box>
            </Flex>
            <Flex className="flex-col custom-scroll" overflow='scroll' maxH='15rem' overflowX='hidden' >
                {renderLoading()}
                {renderArrayProvince()}
            </Flex>
        </Flex>
    )
}

type ItemProps = {
    item?: any
    onClick?: (item: any) => void
}

const Item: FC<ItemProps> = ({ item, onClick }) => {
    return <Box className="hover-primary cursor-pointer hover-bg-gray p-2 px-4" onClick={onClick}> {item.name} </Box>
}

export default AutoComplete