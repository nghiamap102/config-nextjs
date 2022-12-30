import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    SlideDirection,
} from '@chakra-ui/react'
import { sizeType } from 'models/commonModel'
import { FC, RefObject } from 'react'

type DrawerCPNProps = {
    ref?: RefObject<any>
    onClose: () => void
    placement?: SlideDirection
    footer?: any
    body?: any
    title?: string
    size?: sizeType
}

const DrawerCPN: FC<DrawerCPNProps> = ({
    ref,
    onClose,
    placement,
    title,
    footer,
    body,
    size = 'sm',
}) => {
    return (
        <Drawer
            isOpen={true}
            placement={placement || 'right'}
            onClose={onClose}
            finalFocusRef={ref}
            size={size}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader textTransform="capitalize">{title}</DrawerHeader>

                <DrawerBody>{body}</DrawerBody>
                <DrawerFooter>{footer}</DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerCPN
