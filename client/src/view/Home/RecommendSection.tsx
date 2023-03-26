import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react'
import { ProductCard } from '@components/Card'
import Carousel from '@components/Carousel'
import { HeaderViewAll } from '@components/Layout/Header/HeaderViewAll'
import Translation from '@components/Translate'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { FETCH_NEW_PRODUCT } from '@redux/product/productAction'
import { fetchAllProduct, selectProduct } from '@redux/product/productSlice'
import { mainColor } from '@theme/theme'
import usePagination from 'hooks/usePagination'
import { useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'

const RecommendSection = (props: Props) => {
    const dispatch = useAppDispatch()
    const productState = useAppSelector(selectProduct)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(fetchAllProduct(currentPage))
    }, [])

    const handleLoadMoreProduct = () =>{
        // dispatch(fetchAllProduct(currentPage))
    }

    return (
        <Box px={0} py={10}>
            <Heading mb={10}>
                <Translation text='recommend for you' firstCapital fontSize='1.5rem' />
            </Heading>

            <Flex flexWrap='wrap' gap={2} m='0 auto'>
                {productState.newProduct && productState.newProduct?.map((product) => (
                    <ProductCard product={product} maxW='16%' key={product._id} />
                ))}
                {productState.newProduct && productState.newProduct?.map((product) => (
                    <ProductCard product={product} maxW='16%' key={product._id} />
                ))}

                {productState.newProduct && productState.newProduct?.map((product) => (
                    <ProductCard product={product} maxW='16%' key={product._id} />
                ))}
                {productState.newProduct && productState.newProduct?.map((product) => (
                    <ProductCard product={product} maxW='16%' key={product._id} />
                ))}
            </Flex>

            <Flex className='justify-center items-center'>
                <Button variant='outline' bg={mainColor.white} onClick={handleLoadMoreProduct}>
                    <Translation text='load_more' firstCapital />
                </Button>
            </Flex>
        </Box>
    );
};

export default RecommendSection