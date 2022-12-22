import { ImageAssets } from "@assets/index";
import { Box, Container } from "@chakra-ui/react";
import BannerImage from "@components/BannerImage";
import BannerLearnMore from "@components/BannerLearnMore";
import BrandsLogo from "@components/BrandsLogo";
import CategoriesCard from "@components/Card/CategoriesCard";
import ProductCard from "@components/Card/ProductCard";
import Carousel from "@components/Carousel";
import Categories from "@components/Categories";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { HeaderViewAll } from "@components/Header/HeaderViewAll";
import { selectCart } from "@redux/cart/cartSlice";
import { useAppSelector } from "@redux/hooks";
import { IProductItem } from "@redux/product/productModel";
import { mainColor } from "@theme/theme";
import Image from "next/image";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";



const HomePage: FC<{ products: IProductItem[] }> = ({ products }) => {
    const cartSelector = useAppSelector(selectCart)
    console.log(cartSelector.wishList);
    return (
        <>
            <Header />
            <Box bg={mainColor.gray} paddingBottom={50}>
                <Container>
                    <BannerLearnMore
                        style={{ paddingY: '1.5rem' }}
                        text="buy now, pay later starting at 0% APR"
                        icon={<Image src={ImageAssets.BannerAds} alt='abc' />}
                        linkTo='abc'
                    />
                    <Categories />

                    <BannerImage imageSrc={ImageAssets.BannerSale} alt='banner sale' linkTo="abc" />

                    <Box paddingX={5} marginY={10}>
                        <HeaderViewAll title="shop by categories" LinkTo="abc" />

                        <Carousel slidesPerView={6} centeredSlides={false}>
                            {Array(12).fill({
                                link: 'abc' + Math.random() * 100,
                                name: 'Mobile phones',
                                src: ImageAssets.Categories1
                            }).map((ele, index) => (
                                <SwiperSlide key={index}><CategoriesCard src={ele.src} name={ele.name} link={ele.name} /></SwiperSlide>
                            ))}
                        </Carousel>
                    </Box>

                    <Box marginY={10}>
                        <HeaderViewAll title="new products" LinkTo="abc" />

                        <Carousel slidesPerView={5} centeredSlides={false}>
                            {products.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Carousel>
                    </Box>

                    <Box marginY={10}>
                        <HeaderViewAll title="top brands" LinkTo="abc" />

                        <Carousel slidesPerView={6}>
                            {Array(12).fill({
                                link: 'abc' + Math.random() * 100,
                                imageSrc: ImageAssets.ShopifyLogo
                            }).map((brand, index) => (
                                <SwiperSlide key={index}>
                                    <BrandsLogo linkTo={brand.link}>
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