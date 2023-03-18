import { ReactIcon } from "@assets/icon";
import { Box, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Translation from "@components/Translate";
import { mainColor } from "@theme/theme";
import OrderHistoryView from "@view/Order/OrderHistory";
import { ACCOUNTROUTE } from "contants/route";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import ProfileView from "./Profile";
import Collapse from "@components/Collapse";
import AddressView from "./Address";
import { API_ENDPOINT } from "@common/apiEndpoint";
import { API_URL_BE } from "contants/common";

type Props = {

};

const AccountView = (props: Props) => {

    const { data } = useSession()
    const router = useRouter()
    const handleEditProfile = () => {
        router.push('/account/profile', undefined, { shallow: true })
    }

    return (
        <Container maxW='container.xl' py={10}>
            <Grid templateColumns='repeat(12,1fr)'>
                <GridItem colSpan={2} pt={5}>

                    <Flex className="items-center px-2">
                        <Flex className="rounded-full overflow-hidden" color={mainColor.gray1}
                            border={`1px solid  ${mainColor.boxshadow}`}
                        >
                            {data?.user?.avatar
                                ? <Image src={`${API_URL_BE}/file/${data.user.avatar}`}
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
                        <Collapse
                            icon={<ReactIcon.IconFa.FaRegUser size='1.5rem' color={mainColor.newTag} />}
                            childrens={[
                                { linkTo: '/account/profile', text: 'profile' },
                                { linkTo: '/account/address', text: 'address' },
                                { linkTo: '/account/password', text: 'change_password' },
                            ]}
                            title="my_account"
                        />

                        <Collapse
                            icon={<ReactIcon.IconRi.RiBillLine size='1.5rem' color={mainColor.orange} />}
                            title="order"
                            parentLink={ACCOUNTROUTE.ORDER}
                        />

                        <Collapse
                            icon={<ReactIcon.IconHi.HiOutlineTicket size='1.5rem' color={mainColor.orange} />}
                            title="voucher"
                            parentLink={ACCOUNTROUTE.VOUCHER}
                        />
                        <Collapse
                            icon={<ReactIcon.IconIo.IoMdNotificationsOutline size='1.5rem' color={mainColor.red3} />}
                            title="notification"
                            parentLink={ACCOUNTROUTE.NOTIFICATION}
                        />
                        <Collapse
                            icon={<ReactIcon.IconBi.BiCoinStack size='1.5rem' color={mainColor.yellow} />}
                            title="coin"
                            parentLink={ACCOUNTROUTE.COIN}
                        />
                    </Box>

                </GridItem>

                <GridItem colSpan={10} ml={5} minH='80vh'>
                    {data?.user && router.asPath === ACCOUNTROUTE.PROFILE && <ProfileView user={data?.user} />}
                    {data?.user && router.asPath === ACCOUNTROUTE.ORDER && <OrderHistoryView user={data?.user} />}
                    {data?.user && router.asPath === ACCOUNTROUTE.ADDRESS && <AddressView user={data?.user} />}
                </GridItem>

            </Grid>
        </Container>
    );
};



export default AccountView