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
    handleSelectProvince?: (province: ProvinceModel) => void
    handleSelectDistrict?: (district: ProvinceModel) => void
    handleSelectWard?: (ward: ProvinceModel) => void
    handleRemoveLocation?: () => void
};
type AddressData = {
    province?: ProvinceModel[]
    district?: ProvinceModel[]
    ward?: ProvinceModel[]
}

const AutoComplete: FC<AutoCompleteProps> = ({
    address,
    handleRemoveLocation,
    handleSelectProvince,
    handleSelectDistrict,
    handleSelectWard,
}) => {

    const [focus, setFocus] = useState(false)
    const inputRef = useRef<any>()

    const handleClick = () => {
        console.log('abc')
    }


    const renderAddress = () => {
        if (address.province?.name && !address.district?.name) return address.province?.name
        if (address.province?.name && address.district?.name && !address.ward?.name) return `${address.province?.name}, ${address.district?.name}`
        if (address.province?.name && address.district?.name && address.ward?.name) return `${address.province?.name}, ${address.district?.name}, ${address.ward?.name}`
        return ''
    }
    const handleChangeInput = () => {
        console.log('abc')
    }

    return (
        <Flex my={5} px={3} py={2} className="autocomplete justify-between relative" border={`1px solid ${focus ? mainColor.black : mainColor.gray2}`}
            borderRadius='lg'
            onAuxClick={() => console.log('ac')}
            onClick={handleClick}
            transition={'0.3s border-color'}
        >
            <input
                type="text" placeholder="Province, District, Ward" style={{ width: '100%', outline: 'none', border: 'none' }}
                ref={inputRef} value={renderAddress()}
                className="pr-2"
                onFocus={() => setFocus(true)}
                onChange={handleChangeInput}
            />
            <Flex className="items-center ">
                {focus && !address.province && <ReactIcon.IconAi.AiOutlineSearch size='1.5rem' className="mr-2" />}
                {focus && address.province && <ReactIcon.IconGr.GrFormClose size='1.5rem' className="mr-2" onClick={handleRemoveLocation} />}
                <ReactIcon.IconGo.GoTriangleDown color={mainColor.gray2} />
            </Flex>
            {focus && !address.ward && <Suggesstion
                address={address}
                handleSelectProvince={handleSelectProvince}
                handleSelectDistrict={handleSelectDistrict}
                handleSelectWard={handleSelectWard}
            />}
        </Flex>
    );
}

type SuggesstionProps = {
    handleSelectProvince: any
    handleSelectDistrict: any
    handleSelectWard: any
    address: any
}
const Suggesstion: FC<SuggesstionProps> = ({
    handleSelectProvince,
    handleSelectDistrict,
    handleSelectWard,
    address,
}) => {
    const [dataAddress, setDataAddress] = useState<AddressData>({
        province: [],
        district: [],
        ward: []
    })

    useEffect(() => {
        fetchProvince()
    }, [])

    const fetchProvince = async () => {
        const province = await (await axios.get(API_ENDPOINT.PROVINCE)).data
        const district = await (await axios.get(API_ENDPOINT.DISTRICTS)).data
        const ward = await (await axios.get(API_ENDPOINT.WARD)).data
        setDataAddress({ province, district, ward })
    }

    const renderLoading = () => {
        if (dataAddress.province && dataAddress.province?.length < 1 &&
            dataAddress.district && dataAddress.district.length < 1 &&
            dataAddress.ward && dataAddress.ward?.length < 1
        ) {
            return (
                <Flex className="items-center justify-center my-10">
                    <Spinner size='xl' />
                </Flex>
            )
        }
    }

    const renderArrayProvince = () => {
        if (!address.province) {
            return dataAddress.province?.map((item) => (
                <Item key={item.codename} item={item} onClick={() => handleSelectProvince(item)} />
            ))
        } else if (!address.district && address.province) {
            return dataAddress.district?.map((item, index) => (
                <Item key={index} item={item} onClick={() => handleSelectDistrict(item)} />
            ))
        }
        // use infinite prevent loading so much element
        else if (!address.ward && address.district && address.province) {
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
                    <Translation text="province" firstCapital />
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