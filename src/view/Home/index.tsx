import { ImageAssets } from '@assets/index'
import { Box, Container } from '@chakra-ui/react'
import BannerImage from '@components/BannerImage'
import BannerLearnMore from '@components/BannerLearnMore'
import ProductCard from '@components/Card/ProductCard'
import Carousel from '@components/Carousel'
import Categories from '@components/Categories'
import Layout from '@components/Layout'
import { HeaderViewAll } from '@components/Layout/Header/HeaderViewAll'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { fetchProductCategory, fetchProductList, selectProduct } from '@redux/product/productSlice'
import { mainColor } from '@theme/theme'
import ProductCategorySection from '@view/Product/ProductCategorySection'
import Image from 'next/image'
import { FC, useEffect } from 'react'
import { SwiperSlide } from 'swiper/react'

const HomeView: FC = () => {

    const dispatch = useAppDispatch()
    const productState = useAppSelector(selectProduct)

    useEffect(() => {
        dispatch(fetchProductList())
        dispatch(fetchProductCategory())
    }, [])

    console.log(productState.category)

    return (
        <Layout>
            <Box bg={mainColor.gray} paddingBottom={50}>
                <Container>
                    <BannerLearnMore
                        style={{ paddingY: '1.5rem' }}
                        text="buy now, pay later starting at 0% APR"
                        icon={<Image src={ImageAssets.BannerAds} alt="abc" />}
                        linkTo="abc"
                    />
                    <Categories />

                    <BannerImage
                        imageSrc={ImageAssets.BannerSale}
                        alt="banner sale"
                        linkTo="abc"
                    />

                    <ProductCategorySection category={productState.category} />

                    {/* product Section */}
                    <Box marginY={10}>
                        <HeaderViewAll title="new products" LinkTo="abc" />

                        <Carousel slidesPerView={5} centeredSlides={false}>
                            {productState.list && productState.list?.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Carousel>
                    </Box>

                </Container>
            </Box>
        </Layout>
    )
}

export default HomeView
