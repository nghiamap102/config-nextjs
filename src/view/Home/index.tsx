import { ImageAssets } from '@assets/index'
import { Box, Container } from '@chakra-ui/react'
import BannerImage from '@components/BannerImage'
import BannerLearnMore from '@components/BannerLearnMore'
import Categories from '@components/Categories'
import Layout from '@components/Layout'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { fetchProductCategory, selectProduct } from '@redux/product/productSlice'
import { mainColor } from '@theme/theme'
import ProductCategorySection from '@view/Home/ProductCategorySection'
import Image from 'next/image'
import { FC, useEffect } from 'react'
import NewProductSection from './NewProductSection'
import RecommendSection from './RecommendSection'
import ServiceView from './Service'

const HomeView: FC = () => {

    const dispatch = useAppDispatch()
    const productState = useAppSelector(selectProduct)

    useEffect(() => {
        // dispatch(fetchProductList())
        dispatch(fetchProductCategory())
    }, [])

    return (
        <Layout>
            <Box bg={mainColor.gray} paddingBottom={50}>
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

                <Container maxW='container.xl' px={0}>
                    <ProductCategorySection category={productState.category} />
                    <NewProductSection />
                    <RecommendSection />
                </Container>

                {/* product Section */}

                <ServiceView />

            </Box>
        </Layout>
    )
}

export default HomeView
