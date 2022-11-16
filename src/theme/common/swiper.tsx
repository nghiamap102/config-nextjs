import { Global } from '@emotion/react'
import { mainColor } from './color'

const Swiper = () => (
  <Global
    styles={`
    :root{
      '--swiper-navigation-color': ${mainColor.white}; 
      '--swiper-pagination-color': ${mainColor.white};
      '--swiper-navigation-size': '20px';
    }
    .swiper-button-next {
      padding: 20px 20px 20px 22px;
    }
    .swiper-button-prev {
      padding: 20px 22px 20px 20px;
    }
    .swiper-button-next, 
    .swiper-button-prev {
      background: ${mainColor.primary};
      border-radius: 3px;
    }
    .swiper-button-next::after, 
    .swiper-button-prev::after {
      color: ${mainColor.white};
      font-size: 20px;
    }
    .swiper-horizontal>.swiper-pagination-bullets {
        bottom: 12px;
      }
    .swiper-pagination .swiper-pagination-bullet {
        background: ${mainColor.gray};
        opacity: 1;
      }
    .swiper-pagination .swiper-pagination-bullet-active {
        background: ${mainColor.primary};
      }

    .swiper-horizontal>.swiper-scrollbar {
      position: absolute;
      left: 25%;
      bottom: 10px;
      width: 50%;
    }
      `}
  />
)

export default Swiper
