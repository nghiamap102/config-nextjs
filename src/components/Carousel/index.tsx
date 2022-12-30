import { FC } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Swiper } from 'swiper/react'
import { ICarousel } from './Carousel'

const Carousel: FC<ICarousel> = ({ children, ...rest }) => {
    return (
        <Swiper
            {...rest}
            className="cursor-pointer"
            spaceBetween={20}
            // autoplay={{
            //   delay: 5000,
            //   disableOnInteraction: false,
            // }}
            modules={[Autoplay, Pagination, Navigation]}
        >
            {children}
        </Swiper>
    )
}

export default Carousel
