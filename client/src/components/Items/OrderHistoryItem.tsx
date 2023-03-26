import { ReactIcon } from "@assets/icon";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ButtonBorderPrimary, ButtonPrimary } from "@components/Button";
import Tag from "@components/Tag";
import Translation from "@components/Translate";
import { mainColor } from "@theme/theme";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type OrderHistoryItemProps = {

};
const OrderHistoryItem: FC<OrderHistoryItemProps> = (props: Props) => {
    return (
        <Box px={5} py={7} my={2} bg={mainColor.white}>
            <Flex className="justify-between pb-5" borderBottom={`1px solid ${mainColor.gray4}`}>
                <Flex className="items-center">
                    <Tag tag="favourite" px={1}>favourite</Tag>
                    <Text mx={2} className="font-bold">RATEL STORE </Text>
                    <ButtonPrimary size='xs' fontSize='1rem' fontWeight={400} className="capitalize h-auto mx-2" py={1}>
                        <ReactIcon.IconBi.BiMessageAltDetail size='1.2rem' className="mr-1" />
                        chat
                    </ButtonPrimary>
                    <Button border={`1px solid ${mainColor.gray2}`} size='sm'>
                        <ReactIcon.IconAi.AiOutlineShop className="mr-2" />
                        xemshop
                    </Button>
                </Flex>
                <Flex>

                </Flex>
            </Flex>

            <Link href={`/`}>
                <Flex py={3} borderBottom={`1px solid ${mainColor.gray4}`}>
                    <Flex flex={1}>
                        <Box className="mr-6">
                            <Image src='https://res.cloudinary.com/bededuxe/image/upload/v1673522369/hoodie_zs6wgp.jpg' alt="ab"
                                height={70}
                                width={70}
                            />
                        </Box>
                        <Box >
                            <Text>Áo Hoodie Nỉ Bông Nam Nữ QUELLA BY ME Unisex Form Rộng</Text>
                            <Text color={mainColor.gray3}>Phân loại hàng: Kem Sữa,L</Text>
                            <Text>x1</Text>
                        </Box>
                    </Flex>
                    <Flex className="items-center">
                        1799.000d
                    </Flex>
                </Flex>
            </Link>

            <Flex className="justify-end items-center" px={5} py={7}>
                <Flex className="mr-2 items-center">
                    <ReactIcon.IconBi.BiCheckShield size='1.5rem' color={mainColor.red} />
                    <Translation className="capitalize" text="total" />
                    {':'}
                </Flex>
                <Text className="text-3xl" color={mainColor.red}>₫88.500</Text>
            </Flex>

            <Flex className="justify-between items-center">
                <Box className="text-sm">
                    Đánh giá sản phẩm trước
                    Đánh giá ngay và nhận 200 Xu
                </Box>
                <Box>
                    <ButtonPrimary borderRadius='none' px={10} mx={2}>
                        Rating
                    </ButtonPrimary>
                    <ButtonPrimary borderRadius='none' px={10} mx={2} bg={mainColor.white} border={`1px solid ${mainColor.gray4}`} color={mainColor.black}>
                        Contact to seller
                    </ButtonPrimary>
                    <ButtonPrimary borderRadius='none' px={10} mx={2} bg={mainColor.white} border={`1px solid ${mainColor.gray4}`} color={mainColor.black}>
                        Re Purchase
                    </ButtonPrimary>
                </Box>
            </Flex>
        </Box>
    );
};


export default OrderHistoryItem