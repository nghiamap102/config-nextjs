import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, SlideDirection } from "@chakra-ui/react";
import { sizeType } from "models/commonModel";
import { FC, RefObject } from "react";

type DrawerCPNProps = {
    ref?: RefObject<any>
    onClose: () => void
    placement?: SlideDirection
    footer?: boolean
    title? : string
    body?: any
    size?: sizeType 
};

const DrawerCPN: FC<DrawerCPNProps> = ({
    ref,
    onClose,
    placement,
    footer,
    title,
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
                <DrawerHeader textTransform='capitalize'>{title}</DrawerHeader>

                <DrawerBody>
                    {body}
                </DrawerBody>
                {footer &&
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                }
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerCPN