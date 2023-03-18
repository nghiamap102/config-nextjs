import { ReactIcon } from "@assets/icon";
import { Box, Button, Container, Flex, Select, Skeleton, Text } from "@chakra-ui/react";
import { ProductCard } from "@components/Card";
import Carousel from "@components/Carousel";
import UICheckBoxField from "@components/Field/UICheckBoxField";
import Layout from "@components/Layout";
import Translation from "@components/Translate";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { FETCH_CATEGORY_CHILDREN, FETCH_FACET, FETCH_PRODUCT_BY_CATEGORY } from "@redux/product/productAction";
import { selectProduct } from "@redux/product/productSlice";
import { mainColor } from "@theme/theme";
import { SORTTYPE } from "contants/common";
import usePagination from "hooks/usePagination";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { SwiperSlide } from "swiper/react";


const SearchView = () => {

    const dispatch = useAppDispatch()
    const productState = useAppSelector(selectProduct)
    const router = useRouter()
    const { query } = router
    const { currentPage, onPageChange } = usePagination({ totalPage: 50 })

    useEffect(() => {
        dispatch({ type: FETCH_CATEGORY_CHILDREN, payload: query.cat_id })
        dispatch({ type: FETCH_PRODUCT_BY_CATEGORY, payload: `cat_id=${query.cat_id}&sort_type=${query.sort_type}` })
        dispatch({ type: FETCH_FACET, payload: `cat_id=${query.cat_id}&sort_type=${query.sort_type}` })
    }, [])

    const handleClickCategory = (item) => {
        router.push(`/search?cat_name=${item.name}&cat_id=${item._id}`, undefined, { shallow: true })
    }

    const handlePrevPage = (page: number) => {
        onPageChange(page)
    }
    const handleNextPage = (page: number) => {
        onPageChange(page)
    }

    const handleClickSort = (type: string) => {
        console.log(type)
        window.history.pushState(null, 'John', `/search?cat_name=${query.cat_name}&cat_id=${query.cat_id}&sort_type=${type}`);
        dispatch({ type: FETCH_PRODUCT_BY_CATEGORY, payload: `cat_id=${query.cat_id}&sort_type=${type}` })
    }

    const handleClickFacet = (item) => {
        console.log(item)
    }

    return (
        <Layout>
            <Container maxW='container.xl' p={0} my={8}>
                <Carousel pagination navigation>
                    {Array(4)
                        .fill(null)
                        .map((ele, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={'https://res.cloudinary.com/bededuxe/image/upload/v1677509917/vn-50009109-9d525d8a02a6fc9f607ecdc073e52f66_rg1jth.jpg'}
                                    alt="abc"
                                    width={2000}
                                    height={450}
                                />
                            </SwiperSlide>
                        ))}
                </Carousel>
                <Flex my={5} >
                    <Flex className="flex-col" gap={5} w='15%' minH={500} pr={5}>
                        <Flex className="flex-col" gap={3}>
                            <Flex gap={2} className="items-center text-lg" pb={3} borderBottom={`1px solid ${mainColor.gray4}`}>
                                <ReactIcon.IconBs.BsListStars size='1rem' />
                                <Translation text="all_category" fontWeight={600} firstCapital />
                            </Flex>
                            <Flex className="flex-col" pl={3}>
                                {productState.category?.map((item, index) => (
                                    <Flex key={index} color={index === 1 ? mainColor.orange : mainColor.black2}
                                        className="capitalize px-2 py-1.5 relative cursor-pointer"
                                        fontWeight={index === 1 ? 600 : 400}
                                        onClick={() => handleClickCategory(item)}
                                    >
                                        {index === 1 && <ReactIcon.IconGo.GoTriangleRight className="absolute top-1/2 -translate-y-1/2" style={{ left: '-5%' }} />}
                                        {item.name}
                                    </Flex>
                                ))}
                                {productState.category?.length < 1 && <Flex>
                                    <Skeleton height='1rem' />
                                    <Skeleton height='1rem' />
                                    <Skeleton height='1rem' />
                                    <Skeleton height='1rem' />
                                </Flex>
                                }
                            </Flex>
                        </Flex>
                        <Flex className="flex-col" gap={3}>
                            <Flex gap={2} className="items-center text-lg" pb={3} borderBottom={`1px solid ${mainColor.gray4}`}>
                                <ReactIcon.IconBi.BiFilterAlt size='1rem' />
                                <Translation text="search_filter" fontWeight={600} firstCapital />
                            </Flex>
                            <Flex className="flex-col" pl={3}>
                                {productState.facet?.map((item, index) => (
                                    <Flex key={index} color={query.facet === item._id ? mainColor.orange : mainColor.black2}
                                        className="px-2 py-1.5 relative items-baseline" fontWeight={query.facet === item._id ? 600 : 400}
                                        onClick={() => handleClickFacet(item._id)}
                                        gap={2}
                                    >
                                        {query.facet === item._id && <ReactIcon.IconGo.GoTriangleRight className="absolute top-1/2 -translate-y-1/2" style={{ left: '-5%' }} />}
                                        <Text>{item.detail?.name}</Text>
                                        <Text color={mainColor.gray3} className="text-sm">({item.count})</Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>

                        <Flex className="flex-col" gap={3}>
                            <Flex gap={2} className="items-center text-lg" pb={3} borderBottom={`1px solid ${mainColor.gray4}`}>
                                <ReactIcon.IconBi.BiFilterAlt size='1rem' />
                                <Translation text="shipping_options" fontWeight={600} firstCapital />
                            </Flex>
                            <Flex className="flex-col" pl={3}>
                                {['save', 'primary', 'fast'].map((item, index) => (
                                    <Flex key={index} color={index === 1 ? mainColor.orange : mainColor.black2} className="px-2 py-1.5 relative" fontWeight={index === 1 ? 600 : 400}>
                                        <UICheckBoxField placement="right" content={item} active color={mainColor.black} sizeCheckbox="sm" />
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>

                    </Flex>
                    <Flex w='85%' gap={5} p={5} className="flex-col">
                        <Flex px={6} py={4} bg={mainColor.gray4} className="justify-between">
                            <Flex gap={4} className="items-center" flex={1}>
                                <Box> <Translation text="sort_by" firstCapital /> </Box>
                                {/* <Button bg={mainColor.white} px={7} onClick={() => handleClickSort(SORTTYPE.POP)}>
                                    <Translation text="popular" firstCapital />
                                </Button> */}
                                <Button bg={mainColor.white} px={7} onClick={() => handleClickSort(SORTTYPE.SALE)}>
                                    <Translation text="top_sales" firstCapital />
                                </Button>
                                <Button bg={mainColor.white} px={7} onClick={() => handleClickSort(SORTTYPE.TIME)}>
                                    <Translation text="lastest" firstCapital />
                                </Button>
                                <Select bg={mainColor.white} minW='20%' w='auto'>
                                    <option value={'descending'}>descending</option>
                                    <option value={'ascending'}>ascending </option>
                                </Select>
                            </Flex>
                            <Flex className="items-center" gap={4}>
                                {currentPage}/{Math.ceil(productState.count / 50)}
                                <Flex gap={1} className="items-center">
                                    <Button bg={mainColor.white} size='sm' disabled={currentPage < 2} onClick={() => handlePrevPage(currentPage - 1)}>
                                        <ReactIcon.IconTf1.TfiAngleLeft />
                                    </Button>
                                    <Button bg={mainColor.white} size='sm' disabled={currentPage >= 50} onClick={() => handleNextPage(currentPage + 1)}>
                                        <ReactIcon.IconTf1.TfiAngleRight />
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>

                        <Box minH='30rem'>
                            <Flex gap={3} flexWrap={'wrap'}>
                                {!productState.loading && productState.list &&
                                    productState.list?.map((product) => (
                                        <ProductCard key={product._id} borderRadius='lg'
                                            overflow='hidden' product={product}
                                            border={`1px solid ${mainColor.gray4}`}
                                            maxW='20%'
                                        />
                                    ))}
                            </Flex>
                            {productState.loading && (
                                <Flex className="justify-center items-center" h='100%' w='100%'>
                                    <ClipLoader size={50} color={mainColor.orange2} />
                                </Flex>
                            )}
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </Layout>
    );
};


export default SearchView