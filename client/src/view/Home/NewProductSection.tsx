import { Box, Container } from '@chakra-ui/react'
import { ProductCard } from '@components/Card'
import Carousel from '@components/Carousel'
import { HeaderViewAll } from '@components/Layout/Header/HeaderViewAll'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { FETCH_NEW_PRODUCT } from '@redux/product/productAction'
import { selectProduct } from '@redux/product/productSlice'
import { useEffect } from 'react'
import { SwiperSlide } from 'swiper/react'

const NewProductSection = (props) => {

    const dispatch = useAppDispatch()
    const productState = useAppSelector(selectProduct)
    useEffect(() => {
        dispatch({ type: FETCH_NEW_PRODUCT, payload: `limit=50` })
    }, [])

    return (
        <Box  py={10} px={0}>
            <HeaderViewAll title="new products" LinkTo="abc" />

            <Carousel slidesPerView={6} spaceBetween={10} centeredSlides={false}>
                {productState.newProduct && productState.newProduct?.map((product) => (
                    <SwiperSlide key={product._id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
                {productState.newProduct && productState.newProduct?.map((product) => (
                    <SwiperSlide key={product._id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
                {productState.newProduct && productState.newProduct?.map((product) => (
                    <SwiperSlide key={product._id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
                {productState.newProduct && productState.newProduct?.map((product) => (
                    <SwiperSlide key={product._id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Carousel>
        </Box>
    );
};

export default NewProductSection