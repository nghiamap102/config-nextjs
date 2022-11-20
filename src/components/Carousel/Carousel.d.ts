import { AutoplayOptions, NavigationOptions, PaginationOptions } from "swiper/types"

export interface ICarousel {
    children: any
    classNames?: string
    autoplay: AutoplayOptions | boolean
    slidesPerView?: number | 1
    spaceBetween?: number
    speed?: number
    direction?: 'vertical' | 'horizontal' | undefined
    slidesPerGroup?: number
    pagination?: PaginationOptions | boolean
    navigation?: NavigationOptions | boolean 
    centeredSlides?: boolean
    mousewheel?: boolean
    loop?: boolean
    grabCursor?: boolean
    loopFillGroupWithBlank?: boolean
    keyboard?: boolean
    cssMode?: boolean
    navigation?: boolean
    preventInteractionOnTransition?: boolean
    allowSlideNext?: boolean
    allowTouchMove?: boolean
    grid?: GridOpts
    scrollbar?: ScrollBarOpts
    modules?: Modules[]
    initialSlide?: number | 1
    onInit?: () => void
}

interface GridOpts {
    rows: number
}
interface ScrollBarOpts {
    hide: boolean
}
interface Modules {
    name: string
}
