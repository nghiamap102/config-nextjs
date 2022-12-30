import classNames from 'classnames'
import { fillColorArrayRating, tooltipArrayRating } from 'contants/common'
import { FC } from 'react'
import { Rating } from 'react-simple-star-rating'

type SimpleRatingProps = {
    direction?: 'vertical' | 'horizon'
    value?: number
}

const SimpleRating: FC<SimpleRatingProps> = ({ direction, value }) => {
    return (
        <Rating
            SVGclassName={classNames(direction === 'horizon' && 'inline-block')}
            size={25}
            readonly
            tooltipArray={tooltipArrayRating}
            fillColorArray={fillColorArrayRating}
            initialValue={value}
        />
    )
}

export default SimpleRating
