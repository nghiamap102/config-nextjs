import { NoImage } from '@assets/image';
import { Box } from '@chakra-ui/react';
import { API_ENDPOINT } from '@common/apiEndpoint'
import CategoriesCard from '@components/Card/CategoriesCard'
import Carousel from '@components/Carousel'
import { HeaderViewAll } from '@components/Layout/Header/HeaderViewAll';
import { IProductCategory, IProductItem } from '@redux/product/productModel';
import ProductService from '@redux/product/productService';
import { FC, useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react'

type ProductCategorySectionProps = {
    category?:IProductCategory[]
}

const ProductCategorySection: FC<ProductCategorySectionProps> = ({
    category
}) => {

    return (
        <Box marginY={10}>
            <HeaderViewAll
                title="categories"
                LinkTo={API_ENDPOINT.PRODUCT.CATEGORY}
            />
            <Carousel slidesPerView={8} centeredSlides={false}>
                {category?.map((cat) => (
                    <SwiperSlide key={cat._id}>
                        <CategoriesCard
                            link={`${API_ENDPOINT.PRODUCT.CATEGORY}/${cat._id}`}
                            name={cat.name}
                            image={NoImage}
                        />
                    </SwiperSlide>
                ))}
            </Carousel>
        </Box>
    );
};


export default ProductCategorySection