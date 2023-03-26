import { FC, useEffect, useState } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Swiper } from 'swiper/react'
import { ICarousel } from './Carousel'

const Carousel: FC<ICarousel> = ({ children, ...rest }) => {

    const getWindowDimensions = () => {
        if (typeof window !== "undefined") {
            const { innerWidth: width, innerHeight: height } = window;
            return {
                width,
                height
            };
        }
        return null
    }
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const renderSlider = () => {
        if (windowDimensions && windowDimensions.width < 1200 && windowDimensions.width > 1000) return rest.slidesPerView - 2
        if (windowDimensions && windowDimensions.width < 1000 && windowDimensions.width > 800) return rest.slidesPerView - 3
        if (windowDimensions && windowDimensions.width < 800 && windowDimensions.width > 600) return rest.slidesPerView - 4
        return rest.slidesPerView
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Swiper
            {...rest}
            className="cursor-pointer"
            spaceBetween={rest.spaceBetween || 20}
            slidesPerView={renderSlider()}
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
