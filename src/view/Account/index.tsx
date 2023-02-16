import { ReactIcon } from "@assets/icon";
import { Box, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Translation from "@components/Translate";
import { mainColor } from "@theme/theme";
import OrderHistoryView from "@view/Order/OrderHistory";
import { ACCOUNTROUTE } from "contants/route";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useMemo, useRef, useState } from "react";
import AddressView from "./Address";
import ProfileView from "./Profile";

type Props = {

};

const AccountView = (props: Props) => {

    const { data } = useSession()
    const router = useRouter()
    const handleEditProfile = () => {

    }

    const renderProfile = useMemo(() => {
        return <ProfileView user={data?.user} />
    }, [data?.user])

    return (
        <Container maxW='container.xl' py={10}>
            <Grid templateColumns='repeat(12,1fr)'>
                <GridItem colSpan={2} pt={5}>

                    <Flex className="items-center px-2">
                        <Flex className="rounded-full overflow-hidden" color={mainColor.gray1}
                            border={`1px solid  ${mainColor.boxshadow}`}
                        >
                            {data?.user?.image
                                ? <Image src='https://res.cloudinary.com/bededuxe/image/upload/v1673522369/hoodie_zs6wgp.jpg'
                                    alt={data?.user?.name}
                                    height={70}
                                    width={70}
                                />
                                : <ReactIcon.IconAi.AiOutlineUser size='3rem' className="p-2" />}
                        </Flex>

                        <Box ml={6}>
                            <Text className="font-bold">{data?.user?.name}</Text>
                            <Flex className="items-center cursor-pointer" onClick={handleEditProfile}>
                                <ReactIcon.IconHi.HiPencilAlt size='1.2rem' color={mainColor.gray3} />
                                <Translation text="edit_profile" className="capitalize" color={mainColor.gray3} />
                            </Flex>
                        </Box>
                    </Flex>

                    <Box mt={6}>
                        <DropdownItem
                            icon={<ReactIcon.IconFa.FaRegUser size='1.5rem' color={mainColor.newTag} />}
                            childrens={[
                                { linkTo: '/account/profile', text: 'profile' },
                                { linkTo: '/account/address', text: 'address' },
                                { linkTo: '/account/password', text: 'change_password' },
                            ]}
                            title="my_account"
                        />

                        <DropdownItem
                            icon={<ReactIcon.IconRi.RiBillLine size='1.5rem' color={mainColor.orange} />}
                            title="order"
                            parentLink={ACCOUNTROUTE.ORDER}
                        />

                        <DropdownItem
                            icon={<ReactIcon.IconHi.HiOutlineTicket size='1.5rem' color={mainColor.orange} />}
                            title="voucher"
                            parentLink={ACCOUNTROUTE.VOUCHER}
                        />
                        <DropdownItem
                            icon={<ReactIcon.IconIo.IoMdNotificationsOutline size='1.5rem' color={mainColor.red3} />}
                            title="notification"
                            parentLink={ACCOUNTROUTE.NOTIFICATION}
                        />
                        <DropdownItem
                            icon={<ReactIcon.IconBi.BiCoinStack size='1.5rem' color={mainColor.yellow} />}
                            title="coin"
                            parentLink={ACCOUNTROUTE.COIN}
                        />
                    </Box>

                </GridItem>

                <GridItem colSpan={10} ml={5} minH='80vh'>
                    {data?.user && router.asPath === ACCOUNTROUTE.PROFILE && renderProfile}
                    {data?.user && router.asPath === ACCOUNTROUTE.ORDER && <OrderHistoryView user={data?.user} />}
                    {data?.user && router.asPath === ACCOUNTROUTE.ADDRESS && <AddressView user={data?.user} />}
                </GridItem>

            </Grid>
        </Container>
    );
};

type DropdownItemProps = {
    childrens?: {
        linkTo: string
        text: string
    }[]
    parentLink?: string
    title?: string
    icon?: any
}

const DropdownItem: FC<DropdownItemProps> = ({
    childrens,
    icon,
    title,
    parentLink,
}) => {

    const router = useRouter()
    const ref = useRef<any>()
    const [active, setActive] = useState(false)

    const handleToggle = () => {
        childrens && childrens?.some(item => router.asPath === item.linkTo) && setActive(!active)
        childrens && !childrens?.some(item => router.asPath === item.linkTo) && router.push(childrens[0].linkTo, undefined, { shallow: true })
        !childrens && parentLink && router.push(parentLink, undefined, { shallow: true })
    }

    const checkHeighCollapse = () => {
        if (active) {
            return ref.current.scrollHeight
        }
        else if (childrens?.some(item => router.asPath === item.linkTo)) {
            return 'auto'
        }
        return 0
    }


    return (
        <Box >
            <Flex onClick={handleToggle} className="items-center px-2 cursor-pointer" my={1.5} _hover={{ color: mainColor.orange, transition: '0.3s all' }}>
                {icon}
                <Translation text={title} firstCapital ml={4} color={router.asPath === parentLink && mainColor.orange} />
            </Flex>

            <Box ref={ref} pl={12} h={checkHeighCollapse()} transition={'0.3s all'} overflow='hidden'>
                {childrens?.map(item => (
                    <Link key={item.text} href={item.linkTo} shallow>
                        <Translation text={item.text} firstCapital my={1.5} color={router.asPath === item.linkTo && mainColor.orange} className="hover-primary cursor-pointer" />
                    </Link>
                ))}
            </Box>
        </Box>


    )
}


export default AccountView