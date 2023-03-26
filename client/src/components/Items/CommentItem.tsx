import { ReactIcon } from "@assets/icon";
import { Box, Flex, Text } from "@chakra-ui/react";
import SimpleRating from "@components/Rating";
import Translation from "@components/Translate";
import { IComment } from "@redux/product/productModel";
import { mainColor } from "@theme/theme";
import { API_URL_BE } from "contants/common";
import Image from "next/image";
import { FC } from "react";

type CommentItemProps = {
    commentItem?: IComment
    handleLike?: () => void
    handleReport?: () => void
    handleReply?: () => void
};

const CommentItem: FC<CommentItemProps> = ({
    commentItem,
    handleLike,
    handleReply,
    handleReport,
}) => {
    return (
        <Flex gap={5} py={5} borderBottom={`1px solid ${mainColor.gray4}`} >
            <Box>
                <Flex className="items-start rounded-full overflow-hidden">
                    <Image
                        src={`${API_URL_BE}/file/${commentItem?.user?.avatar}`}
                        alt="avatar"
                        height={50}
                        width={50}
                    />
                </Flex>
            </Box>
            <Box w='100%'>
                <Text className="text-sm mb-2">{commentItem?.user?.name}</Text>
                <SimpleRating direction="horizon" starSize={15} value={commentItem.star} mb={2} />
                <Flex className="text-sm mb-2" color={mainColor.gray3} gap={2}>
                    <Text borderRight={`1px solid ${mainColor.gray5}`}> {new Date(commentItem.createdAt).toLocaleString()} </Text>

                    <Flex>
                        <Translation text="variation" firstCapital />{':'}
                    </Flex>

                    {commentItem?.category?.map(item => (
                        <Box key={item.title}>
                            {item.title}{':'} {item.cat_content}
                        </Box>
                    ))}
                </Flex>
                <Text className="mb-4">{commentItem?.content}</Text>
                <Flex gap={3} mb={4}>
                    {commentItem?.image?.map((item, index) => (
                        <Flex key={index} border={`1px solid ${mainColor.gray4}`}>
                            <Image
                                src={`${API_URL_BE}/file/${item}`}
                                alt="avatar"
                                height={65}
                                width={65}
                            />
                        </Flex>
                    ))}
                </Flex>
                <Flex className="items-center justify-between w-full" >
                    <Flex gap={2} className="cursor-pointer" onClick={handleLike}>
                        <ReactIcon.IconAi.AiFillLike size='1.5rem' color={mainColor.gray3} />
                        <Text>Helpful</Text>
                    </Flex>
                    <ReactIcon.IconAi.AiOutlineMore size='1.5rem' className="mx-2 cursor-pointer" />
                </Flex>
            </Box>
        </Flex>
    );
};

export default CommentItem