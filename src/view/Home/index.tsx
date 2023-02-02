import { ImageAssets } from '@assets/index'
import { Box, Container } from '@chakra-ui/react'
import BannerImage from '@components/BannerImage'
import BannerLearnMore from '@components/BannerLearnMore'
import BrandsLogo from '@components/BrandsLogo'
import CategoriesCard from '@components/Card/CategoriesCard'
import ProductCard from '@components/Card/ProductCard'
import Carousel from '@components/Carousel'
import Categories from '@components/Categories'
import Layout from '@components/Layout'
import { HeaderViewAll } from '@components/Layout/Header/HeaderViewAll'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { selectProduct } from '@redux/product/productSlice'
import { mainColor } from '@theme/theme'
import Image from 'next/image'
import { FC, useEffect } from 'react'
import { SwiperSlide } from 'swiper/react'

const HomeView: FC = () => {

    const dispatch = useAppDispatch()
    const productState = useAppSelector(selectProduct)
    useEffect(() => {
        // dispatch(fetchCartList())
        // dispatch(fetchProductList())
    }, [])
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

                    <Box paddingX={5} marginY={10}>
                        <HeaderViewAll
                            title="shop by categories"
                            LinkTo="abc"
                        />

                        <Carousel slidesPerView={6} centeredSlides={false}>
                            {Array(12)
                                .fill({
                                    link: 'abc' + Math.random() * 100,
                                    name: 'Mobile phones',
                                    src: ImageAssets.Categories1,
                                })
                                .map((ele, index) => (
                                    <SwiperSlide key={index}>
                                        <CategoriesCard
                                            src={ele.src}
                                            name={ele.name}
                                            link={ele.name}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Carousel>
                    </Box>

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

                    <Box marginY={10}>
                        <HeaderViewAll title="top brands" LinkTo="abc" />

                        <Carousel slidesPerView={6}>
                            {Array(12)
                                .fill({
                                    link: 'abc' + Math.random() * 100,
                                    imageSrc: ImageAssets.ShopifyLogo,
                                })
                                .map((brand, index) => (
                                    <SwiperSlide key={index}>
                                        <BrandsLogo linkTo={brand.link}>
                                            <Image
                                                src={brand.imageSrc}
                                                alt="logo"
                                                height={80}
                                                width={150}
                                            />
                                        </BrandsLogo>
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
