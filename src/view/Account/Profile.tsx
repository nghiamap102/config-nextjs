import { Box, Flex, Input, Select, Text } from "@chakra-ui/react";
import { ButtonPrimary } from "@components/Button";
import SelectCircle from "@components/Select/SelectCircle";
import { H6 } from "@components/Text/H6";
import CustomToast from "@components/Toast";
import Translation from "@components/Translate";
import { UPDATE_USER } from "@redux/auth/authAction";
import { selectAuth } from "@redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { mainColor } from "@theme/theme";
import { SEX } from "contants/common";
import { DATE, MONTH, YEAR } from "contants/date";
import { ChangeEvent, FC, useEffect, useState } from "react";


type ProfileViewProps = {
    user?: any
}

const ProfileView: FC<ProfileViewProps> = ({ user }) => {
    const dispatch = useAppDispatch()
    const authState = useAppSelector(selectAuth)
    const toast = CustomToast()
    const [userData, setUserData] = useState<any>(user)
    const date_of_birth = new Date(userData?.date_of_birth)
    const date = new Date()

    const handleChangeSex = (sex: string) => {
        setUserData({ ...userData, sex: sex })
    }

    const handleSaveIn4 = () => {
        dispatch({ type: UPDATE_USER, payload: { ...userData, date_of_birth: new Date(userData.date_of_birth).toISOString() } })
    }
    const handleChangeDate = (e: ChangeEvent<HTMLSelectElement>) => setUserData({ ...userData, date_of_birth: date_of_birth.setDate(parseInt(e.target.value)) })
    const handleChangeMonth = (e: ChangeEvent<HTMLSelectElement>) => setUserData({ ...userData, date_of_birth: date_of_birth.setMonth(parseInt(e.target.value) - 1) })
    const handleChangeYear = (e: ChangeEvent<HTMLSelectElement>) => setUserData({ ...userData, date_of_birth: date_of_birth.setFullYear(parseInt(e.target.value)) })


    useEffect(() => {
        authState.updateSuccess && toast({ title: 'Update success' })
    }, [authState.updateSuccess])

    return (
        <Box py={5} px={10} bg={mainColor.white}  >
            <Box pb={7} borderBottom={`1px solid ${mainColor.gray}`}>
                <H6 text="my_profile" fontWeight={500} className="capitalize" />
                <Translation text="Quản lý thông tin hồ sơ để bảo mật tài khoản" fontWeight={400} />
            </Box>
            <Box mt={5}>
                <Box maxW='60%' >
                    <Flex w='100%' my={6}>
                        <Flex w='20%' className="justify-end">
                            <Text color={mainColor.gray2}>Username</Text>
                        </Flex>
                        <Flex w='60%' ml={8}>
                            {userData?.email?.slice(0, userData?.email?.indexOf('@'))}
                        </Flex>
                    </Flex>

                    <Flex w='100%' my={6}>
                        <Flex w='20%' className="justify-end">
                            <Text color={mainColor.gray2}>Name</Text>
                        </Flex>
                        <Flex w='60%' ml={8}>
                            <Input value={userData?.name} />
                        </Flex>
                    </Flex>

                    <Flex w='100%' my={6}>
                        <Flex w='20%' className="justify-end">
                            <Text color={mainColor.gray2}>Email</Text>
                        </Flex>
                        <Flex w='60%' ml={8} className="items-center">
                            <Text> {userData?.email?.replace(userData.email.slice(3, userData.email.indexOf('@')), '*'.repeat(userData.email.indexOf('@')))} </Text>
                            <SelectChange />
                        </Flex>
                    </Flex>

                    <Flex w='100%' my={6}>
                        <Flex w='20%' className="justify-end">
                            <Text color={mainColor.gray2}>Phone</Text>
                        </Flex>
                        <Flex w='60%' ml={8} className="items-center">
                            {userData?.phone}
                            <SelectChange />
                        </Flex>
                    </Flex>

                    <Flex w='100%' my={6}>
                        <Flex w='20%' className="justify-end">
                            <Text color={mainColor.gray2}>Sex</Text>
                        </Flex>
                        <Flex w='60%' ml={8} className="items-center">
                            {SEX.map(sex => (
                                <Flex key={sex} className="mx-2 cursor-pointer" onClick={() => handleChangeSex(sex)}>
                                    <SelectCircle mr={2} active={userData?.sex === sex || userData?.sex == sex} />
                                    <Text className="capitalize">{sex}</Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>


                    <Flex w='100%' my={6}>
                        <Flex w='20%' className="justify-end">
                            <Text color={mainColor.gray2}>Date of birth</Text>
                        </Flex>
                        <Flex w='60%' ml={8} className="items-center">
                            <Select size='md' mx={2} onChange={handleChangeDate}
                                defaultValue={date_of_birth ? date_of_birth.getDate() : date.getDate()}
                                _focus={{ borderColor: mainColor.orange, boxShadow: `0px 0px 1px 1px ${mainColor.orange}` }}
                            >
                                {DATE.map(item => <option value={item} key={item} >{item}</option>)}
                            </Select>
                            <Select size='md' mx={2} onChange={handleChangeMonth}
                                defaultValue={date_of_birth ? date_of_birth.getMonth() + 1 : date.getMonth() + 1}
                                _focus={{ borderColor: mainColor.orange, boxShadow: `0px 0px 1px 1px ${mainColor.orange}` }}
                            >
                                {MONTH.map(item => <option value={item} key={item}>{item}</option>)}
                            </Select>
                            <Select size='md' mx={2} onChange={handleChangeYear}
                                defaultValue={date_of_birth ? date_of_birth.getFullYear() : date.getFullYear()}
                                _focus={{ borderColor: mainColor.orange, boxShadow: `0px 0px 1px 1px ${mainColor.orange}` }}
                            >
                                {YEAR.map(item => <option value={item} key={item} >{item}</option>)}
                            </Select>
                        </Flex>
                    </Flex>

                    <Flex className="justify-center items-center">
                        <ButtonPrimary onClick={handleSaveIn4}>
                            Save
                        </ButtonPrimary>

                    </Flex>


                </Box>
                <Box maxW='40%'>

                </Box>
            </Box>
        </Box>
    );
};


const SelectChange: FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
        <Text ml={2}
            className="capitalize cursor-pointer text-sm" color={mainColor.blueDark}
            _hover={{ color: mainColor.newTag }} textDecoration='underline'
            onClick={onClick}
        >
            change
        </Text>
    )
}


const SelectItem: FC<> = () => {
    return (
        <Select size='md' mx={2} _focus={{ borderColor: mainColor.orange, boxShadow: `0px 0px 1px 1px ${mainColor.orange}` }} >
            {YEAR.map(item => <option value={item} key={item} selected={date_of_birth.getFullYear() === item}>{item}</option>)}
        </Select>
    )
}


export default ProfileView