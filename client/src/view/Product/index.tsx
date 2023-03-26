import { ReactIcon } from '@assets/icon'
import { Box, Button, Container, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import Breadcrumb from '@components/Breadcrumb'
import { ButtonPrimary } from '@components/Button'
import CommentItem from '@components/Items/CommentItem'
import Layout from '@components/Layout'
import Pagination from '@components/Pagination'
import SimpleRating from '@components/Rating'
import Translation from '@components/Translate'
import { FETCH_COMMENT, FETCH_COMMENT_PAGINATION, FETCH_COMMENT_RATING, FETCH_PRODUCT_BY_ID } from '@redux/product/productAction'
import { selectProduct } from '@redux/product/productSlice'
import { mainColor } from '@theme/theme'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import ProductInfo from './ProductInfo'

const ProductView: FC = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const productState = useAppSelector(selectProduct)

    useEffect(() => {
        dispatch({ type: FETCH_PRODUCT_BY_ID, payload: `product_id=${router.query.slug}` })
    }, [])

    return (
        <Layout>
            {/* <textarea cols={100} rows={100} onChange={(e) => console.log(e.target.value)} /> */}
            <Container maxW='container.xl' p={0} >
                <Breadcrumb className='my-6' />

                <Box bg={mainColor.white} p={10}>
                    <ProductInfo product={productState?.detail} />
                </Box>

                <Flex bg={mainColor.white} my={5} p={6} px={10}>
                    <Flex pr={20} gap={5} className='items-center' borderRight={`1px solid ${mainColor.gray4}`}>
                        <Box className='inline-flex rounded-full overflow-hidden' border={`1px solid ${mainColor.gray3}`}>
                            <Image
                                src='http://localhost:3031/file/63f57fbb429c700a63375886'
                                alt='avatar'
                                height={70}
                                width={70}
                            />
                        </Box>
                        <Box>
                            <Text className='text-lg' lineHeight='short'>nahanystore</Text>
                            <Text color={mainColor.gray3} mb={3}>Active 45 Hours Ago</Text>
                            <Flex gap={3}>
                                <ButtonPrimary size='md' gap={2}>
                                    <ReactIcon.IconIo5.IoChatbubbles size='1.5rem' />
                                    <Translation text='chat now' fontWeight={400} firstCapital />
                                </ButtonPrimary>
                                <Button size='md' variant='outline' gap={3}>
                                    <ReactIcon.IconAi.AiOutlineShop size='1.5rem' />
                                    <Translation text='view shop' fontWeight={400} firstCapital />
                                </Button>
                            </Flex>
                        </Box>
                    </Flex>

                    <Flex flex={1} pl={20} className='items-center'>
                        <Grid templateColumns='repeat(12,1fr)' w='80%' gap={6}>
                            {Array(6).fill(null).map((item, index) => (
                                <GridItem h='5' colSpan={4} key={index}>
                                    <Flex className='justify-between' w='100%'>
                                        <Text color={mainColor.gray3} className='text-lg'>Rating</Text>
                                        <Text color={mainColor.orange}>21</Text>
                                    </Flex>
                                </GridItem>
                            ))}
                        </Grid>
                    </Flex>
                </Flex>

                <Box bg={mainColor.white} p={5} mb={6}>
                    <Box className='p-3' bg={mainColor.gray}>
                        <Text className='text-xl font-normal'>Product Specifications</Text>
                    </Box>
                    <Box className='my-6 px-4'>
                        <Flex className='items-center mb-5'>
                            <Flex w='10rem' color={mainColor.gray3} fontSize='1rem'>Warranty Type</Flex>
                            <Flex>Supplier Warranty</Flex>
                        </Flex>
                        <Flex className='items-center mb-5'>
                            <Flex w='10rem' color={mainColor.gray3} fontSize='1rem'>Warranty Duration</Flex>
                            <Flex >6 Months</Flex>
                        </Flex>
                        <Flex className='items-center mb-5'>
                            <Flex w='10rem' color={mainColor.gray3} fontSize='1rem'>Country of Origin</Flex>
                            <Flex> China</Flex>
                        </Flex>
                        <Flex className='items-center mb-5'>
                            <Flex w='10rem' color={mainColor.gray3} fontSize='1rem'>Bag Style</Flex>
                            <Flex> Quận Bắc Từ Liêm, Hà Nội</Flex>
                        </Flex>
                        <Flex className='items-center mb-5'>
                            <Flex w='10rem' color={mainColor.gray3} fontSize='1rem'>Stock</Flex>
                            <Flex>1557</Flex>
                        </Flex>
                        <Flex className='items-center mb-5'>
                            <Flex w='10rem' color={mainColor.gray3}>Warranty Duration</Flex>
                            <Flex> Quận Bắc Từ Liêm, Hà Nội</Flex>
                        </Flex>
                    </Box>

                    <Box className='p-3' bg={mainColor.gray}>
                        <Text className='text-xl font-normal'>Product Description</Text>
                    </Box>

                    <Box className='my-6 px-4'>
                        *Thông tin sản phẩm:
                        -Kích thước: sizecm
                        -Chất liệu: Da PU
                        -Màu sắc:
                        - Thiết kế rất dễ phối hợp cùng nhiều kiểu trang phục khác nhau giúp các bạn khách iu nữ bớt lo lắng khi set up đồ.
                        - Thích hợp: Đi chơi, đi học, đi làm, du lịch, công sở…

                        CAM KẾT CỦA SHOP
                        - Khách hoàn toàn có thể đổi trả, hoàn tiền nếu shop giao sai mẫu, màu sắc số lượng hay chất lượng sản phẩm.
                        - Sản phẩm giống ảnh mô tả (Ảnh hoàn toàn do shop tự chụp)
                        - Hãy nhấn "Theo dõi" shop để được cập nhật nhiều mã giảm giá và ưu đãi khác.
                        - Nếu có bất cứ thắc mắc nào xin liên hệ với shop qua khung chat của shop để được hỗ trợ sớm nhất.

                        HƯỚNG DẪN VỆ SINH:
                        -Không giặt tẩy bằng các chất tẩy rửa mạnh
                        -Không nên giặt chung với các sản phẩm khác
                        -Không nên sấy khô trong máy giặt sẽ làm ảnh hướng đến các phần cầu kì như móc, khoá cứng

                        Cách vệ sinh sản phẩm: Dùng chất tẩy rửa nhẹ như xà bông, sửa tắm chà đánh bọt lên xong chà nhẹ lên vải. Sau đó giặt nhẹ lại bằng nước sạch Phơi mát tự nhiên tránh ánh nắng mặt trời làm ảnh hướng đến chất liệu và bạc màu vải

                        🎁🎁🎁Nahany xin cảm ơn quý khách đã ghé qua và tin tưởng lựa chọn sản phẩm của shop.

                        #túi_xách  #túi_xách_nữ_đeo_chéo  #túi_đeo_nữ_đi_chơi  #túi_công_sở  #túi_xách_nữ_cao_cấp  #túi_nữ_đẹp  #tui_xach_nu  #tui_đeo_cheo  #túi_xách_đi_chơi  #túi_kẹp_nách
                    </Box>
                </Box>

                <ProductRating />
            </Container>
        </Layout >
    )
}

// split it

const ProductRating: FC = () => {
    const dispatch = useAppDispatch()
    const productState = useAppSelector(selectProduct)
    const router = useRouter()
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        router.query?.slug && dispatch({ type: FETCH_COMMENT_RATING, payload: router.query?.slug })
    }, [])

    const handlefilter = (item) => {
        setFilter(item)
        dispatch({
            type: FETCH_COMMENT, payload: {
                product_id: router.query?.slug,
                page: 1,
                type: item
            }
        })
    }

    const handleSelect = (page: number) => {
        console.log(filter)
        dispatch({
            type: FETCH_COMMENT, payload: {
                product_id: router.query?.slug,
                page: page,
                type: filter
            }
        })
    }

    return (
        <Box bg={mainColor.white} p={6}>
            <Box className='p-3'>
                <Text className='text-xl font-normal'>Product Rating</Text>
            </Box>
            <Flex bg={mainColor.skin2} p={5} gap={20} mb={5}>
                <Flex className='items-center flex-col'>
                    <Text fontWeight={500} fontSize='2xl' color={mainColor.red}>
                        {productState?.commentRating?.star_avg?.value}/5
                    </Text>
                    <SimpleRating value={productState?.commentRating?.star_avg?.value} starSize={25} />
                </Flex>
                <Flex className='items-center' gap={4}>
                    {productState?.commentRating?.filter && Object.keys(productState?.commentRating?.filter)?.map(item => {
                        return (
                            <RatingFilterItem
                                key={item}
                                handleFilterStar={() => handlefilter(item)} active={filter ? filter === item : item === 'all'}
                                content={item} count={productState?.commentRating?.filter[item]}
                            />
                        )
                    })}
                </Flex>
            </Flex>
            <Box pl={4}>
                {productState.comment?.map(item => <CommentItem key={item._id} commentItem={item} />)}
            </Box>

            <Pagination totalPage={25} onSelect={handleSelect} />
        </Box>
    )
}


type RatingFilterItemProps = {
    active?: boolean
    count?: number
    content?: string
    handleFilterStar?: () => void
}
const RatingFilterItem: FC<RatingFilterItemProps> = ({ handleFilterStar, active = false, count, content }) => {

    const renderContent = () => {
        if (content?.includes('star')) return content?.split('_').reverse().join(" ")
        return content?.replace('_', ' ')
    }

    return (
        <Flex minW='7rem' gap={1} className='px-2 cursor-pointer items-center flex-wrap justify-center py-1 text-lg' border={`1px solid ${active ? mainColor.red : mainColor.gray4}`}
            bg={mainColor.white} color={active && mainColor.red} fontWeight={400}
            onClick={handleFilterStar}
        >
            <Translation text={renderContent()} firstCapital />
            {count !== undefined && <Text className='text-sm'>({count})</Text>}
        </Flex>
    )
}

export default ProductView
