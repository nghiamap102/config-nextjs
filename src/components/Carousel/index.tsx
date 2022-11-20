import classNames from 'classnames'
import React from 'react'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Swiper } from 'swiper/react'
import { ICarousel } from './Carousel'
import styles from './Carousel.module.css'

const Carousel: React.FC<ICarousel> = ({ className, children, ...rest }) => {

  return (
    <Swiper
      {...rest}
      className={classNames(className ,styles.swiper)}
    >
      {children}
    </Swiper>
  )
}

export default Carousel
