import { Box } from '@chakra-ui/react';
import { API_ENDPOINT } from '@common/apiEndpoint';
import CategoriesCard from '@components/Card/CategoriesCard';
import Carousel from '@components/Carousel';
import { HeaderViewAll } from '@components/Layout/Header/HeaderViewAll';
import { IProductCategoryLabel } from '@redux/product/productModel';
import { FC } from 'react';
import { SwiperSlide } from 'swiper/react';

type ProductCategorySectionProps = {
    category?: IProductCategoryLabel[]
}

const ProductCategorySection: FC<ProductCategorySectionProps> = ({
    category
}) => {

    return (
        <Box py={10}>
            <HeaderViewAll
                title="categories"
                LinkTo={API_ENDPOINT.PRODUCT.CATEGORY}
            />
            <Carousel slidesPerView={8} centeredSlides={false}>
                {category?.map((cat) => (
                    <SwiperSlide key={cat._id}>
                        <CategoriesCard
                            link={`search?cat_name=${cat.name}&cat_id=${cat._id}`}
                            name={cat.name}
                            image={cat.image}
                        />
                    </SwiperSlide>
                ))}
            </Carousel>
        </Box>
    );
};


export default ProductCategorySection