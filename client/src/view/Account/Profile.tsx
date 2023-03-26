import { NoAvatar } from "@assets/image";
import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { ButtonPrimary } from "@components/Button";
import ImageSelect from "@components/Image";
import SelectCircle from "@components/Select/SelectCircle";
import { H6 } from "@components/Text/H6";
import CustomToast from "@components/Toast";
import Translation from "@components/Translate";
import { UPDATE_USER } from "@redux/auth/authAction";
import { IUser } from "@redux/auth/authModel";
import { selectAuth } from "@redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { mainColor } from "@theme/theme";
import { hashSizetoMb } from "@utils/helper";
import { SEX } from "contants/common";
import { DATE, MONTH, YEAR } from "contants/date";
import Image from "next/image";
import { ChangeEvent, FC, useRef, useState } from "react";


type ProfileViewProps = {
    user?: any
}

const ProfileView: FC<ProfileViewProps> = ({ user }) => {
    const authState = useAppSelector(selectAuth)
    const dispatch = useAppDispatch()
    const toast = CustomToast()
    const [userData, setUserData] = useState<IUser>(user)
    const date_of_birth = new Date(userData.date_of_birth.toString())
    const date = new Date()

    const imageRef = useRef<any>(null)

    const handleChangeSex = (sex: string) => {
        setUserData({ ...userData, sex: sex })
    }

    const handleSaveIn4 = () => {
        dispatch({
            type: UPDATE_USER, payload: {
                ...userData,
                date_of_birth: new Date(userData.date_of_birth).toISOString(),
            }
        })
    }
    const handleChangeDate = (e: ChangeEvent<HTMLSelectElement>) => setUserData({ ...userData, date_of_birth: date_of_birth.setDate(parseInt(e.target.value)) })
    const handleChangeMonth = (e: ChangeEvent<HTMLSelectElement>) => setUserData({ ...userData, date_of_birth: date_of_birth.setMonth(parseInt(e.target.value) - 1) })
    const handleChangeYear = (e: ChangeEvent<HTMLSelectElement>) => setUserData({ ...userData, date_of_birth: date_of_birth.setFullYear(parseInt(e.target.value)) })

    const handleChangeName = (e) => setUserData({ ...userData, name: e.target.value })

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files[0] && hashSizetoMb(e.target.files[0].size) > 1) {
            toast({ title: 'maximum of image is 1MB', status: 'info' })
        } else if (e.target.files[0]) {
            setUserData({ ...userData, avatar: e.target.files[0] })
        }
    }

    return (
        <Box py={5} px={10} bg={mainColor.white}  >
            <Box pb={7} borderBottom={`1px solid ${mainColor.gray}`}>
                <H6 text="my_profile" fontWeight={500} className="capitalize" />
                <Translation text="Quản lý thông tin hồ sơ để bảo mật tài khoản" fontWeight={400} />
            </Box>
            <Flex mt={5}>
                <Box w='60%' borderRight={`1px solid ${mainColor.gray4}`}>
                    <FormItem title="Username"> {userData?.email?.slice(0, userData?.email?.indexOf('@'))} </FormItem>

                    <FormItem title="Name"> <Input value={userData?.name} onChange={handleChangeName} /> </FormItem>

                    <FormItem title="Email">
                        <Text> {userData?.email?.replace(userData.email.slice(3, userData.email.indexOf('@')), '*'.repeat(userData.email.indexOf('@')))} </Text>
                        <SelectChange />
                    </FormItem>

                    <FormItem title="Phone">
                        {userData?.phone}
                        <SelectChange />
                    </FormItem>

                    <FormItem title="Sex">
                        {SEX.map(sex => (
                            <Flex key={sex} className="mr-4 cursor-pointer" onClick={() => handleChangeSex(sex)}>
                                <SelectCircle mr={2} active={userData?.sex === sex || userData?.sex == sex} />
                                <Text className="capitalize">{sex}</Text>
                            </Flex>
                        ))}
                    </FormItem>

                    <FormItem title="Date of birth">
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
                    </FormItem>

                    <Flex className="justify-center items-center">
                        <ButtonPrimary onClick={handleSaveIn4} isLoading={authState.loading}> Save </ButtonPrimary>
                    </Flex>
                </Box>
                <Box w='40%' className="text-center" >
                    <ImageSelect ref={imageRef} image={userData.avatar} handleChangeImage={handleChangeImage} />
                    <Text color={mainColor.gray3}>File size: maximum 1 MB </Text>
                    <Text color={mainColor.gray3}>File extension: .JPEG, .PNG</Text>
                </Box>
            </Flex>
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

type FormItemProps = {
    title?: string
}
const FormItem: FC<FormItemProps> = ({ title, children }) => {
    return (
        <Flex my={6}>
            <Flex w='20%' className="justify-end">
                <Text color={mainColor.gray2}>{title}</Text>
            </Flex>
            <Flex w='60%' ml={8}>
                {children}
            </Flex>
        </Flex>
    )
}


export default ProfileView