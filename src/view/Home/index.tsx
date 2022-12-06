import { ImageAssets } from "@assets/index";
import { Box, Container } from "@chakra-ui/react";
import BannerImage from "@components/BannerImage";
import BannerLearnMore from "@components/BannerLearnMore";
import BrandsLogo from "@components/BrandsLogo";
import { ProductCard } from "@components/Card";
import CategoriesCard from "@components/Card/CategoriesCard";
import Carousel from "@components/Carousel";
import Categories from "@components/Categories";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { HeaderViewAll } from "@components/Header/HeaderViewAll";
import { mainColor } from "@theme/theme";
import Image from "next/image";
import { FC } from "react";
import { cartActions, selectCart } from "redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectProduct } from "redux/product/productSlice";
import { SwiperSlide } from "swiper/react";

const HomePage: FC = () => {

    const dispatch = useAppDispatch()
    const productSelector = useAppSelector(selectProduct)
    const cartSelector = useAppSelector(selectCart)

    return (
        <>
            <Header />
            <Box bg={mainColor.gray} paddingBottom={50}>
                <Container>
                    <BannerLearnMore
                        style={{ paddingY: '1.5rem' }}
                        text="buy now, pay later starting at 0% APR"
                        icon={<Image src={ImageAssets.BannerAds} alt='abc' />}
                    />
                    <Categories />

                    <BannerImage imageSrc={ImageAssets.BannerSale} alt='banner sale' linkTo="abc" />

                    <Box paddingX={5} marginY={10}>
                        <HeaderViewAll title="shop by categories" />

                        <Carousel slidesPerView={6} centeredSlides={false}>
                            {Array(12).fill({
                                link: 'abc',
                                name: 'Mobile phones',
                                src: ImageAssets.Categories1
                            }).map((ele, index) => (
                                <SwiperSlide key={index}><CategoriesCard src={ele.src} name={ele.name} link={ele.name} /></SwiperSlide>
                            ))}
                        </Carousel>
                    </Box>

                    <Box marginY={10}>
                        <HeaderViewAll title="new products" />

                        <Carousel slidesPerView={5} centeredSlides={false}>
                            {Array(12).fill({
                                id: 'abc',
                                link: 'abc',
                                name: '(Product 16) Sample - Computers & Accessories For Sale',
                                rate: Math.round(Math.random() * 5),
                                price: 20,
                                sale: 10,
                                sample: [
                                    {
                                        color: 'black',
                                        imageSrc: ImageAssets.ProuductLoa1
                                    },
                                    {
                                        color: 'gray',
                                        imageSrc: ImageAssets.Categories1
                                    },
                                    {
                                        color: 'orange',
                                        imageSrc: ImageAssets.ProuductLoa1
                                    }
                                ],
                            }).map((product, index) => (
                                <SwiperSlide key={index}>
                                    <ProductCard
                                        id={product.id}
                                        sample={product.sample}
                                        name={product.name}
                                        tag='hot'
                                        price={product.price}
                                        rate={product.rate}
                                        sale={product.sale}
                                        handleAddToCart={() => dispatch(cartActions.addToCart(product))}
                                    />
                                </SwiperSlide>
                            ))}
                        </Carousel>
                    </Box>


                    {/* <Box marginY={10}>
                        <Carousel slidesPerView={5} centeredSlides={false}>
                            {Array(12).fill({
                                id: 'abc',
                                link: 'abc',
                                name: '(Product 16) Sample - Computers & Accessories For Sale',
                                rate: Math.round(Math.random() * 5),
                                price: 20,
                                sale: 10,
                                sample: [
                                    {
                                        color: 'black',
                                        imageSrc: ImageAssets.ProuductLoa1
                                    },
                                    {
                                        color: 'gray',
                                        imageSrc: ImageAssets.ProuductLoa1
                                    },
                                    {
                                        color: 'orange',
                                        imageSrc: ImageAssets.ProuductLoa1
                                    }
                                ],
                            }).map((product, index) => (
                                <SwiperSlide key={index}>
                                    <ProductCard
                                        id={product.id}
                                        sample={product.sample}
                                        name={product.name}
                                        tag='hot'
                                        price={product.price}
                                        rate={product.rate}
                                        sale={product.sale}
                                    />
                                </SwiperSlide>
                            ))}
                        </Carousel>
                    </Box> */}


                    <Box marginY={10}>
                        <HeaderViewAll title="top brands" />

                        <Carousel slidesPerView={6}>
                            {Array(12).fill({
                                link: 'abc',
                                imageSrc: ImageAssets.ShopifyLogo
                            }).map((brand, index) => (
                                <SwiperSlide key={index}>
                                    <BrandsLogo linkTo="abc">
                                        <Image src={brand.imageSrc} alt="logo" height={80} width={150} />
                                    </BrandsLogo>
                                </SwiperSlide>
                            ))}
                        </Carousel>
                    </Box>

                </Container>
            </Box>

            <Footer />
        </>
    );
};


export default HomePage