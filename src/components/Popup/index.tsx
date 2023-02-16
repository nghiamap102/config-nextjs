import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalProps } from "@chakra-ui/react";
import { ButtonPrimary } from "@components/Button";
import { mainColor } from "@theme/theme";
import { FC } from 'react';

type PopupProps = {
    title?: string
    cancel?: boolean
    onApply?: () => void
    ref?: any
} & ModalProps;

const Popup: FC<PopupProps> = ({ title, children, cancel, onApply, ...props }) => {
    return (
        <Modal {...props}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody ref={props.ref}>
                    {children}
                </ModalBody>

                <ModalFooter>
                    <ButtonPrimary mr={3} onClick={onApply}>
                        Apply
                    </ButtonPrimary>
                    {cancel && <Button variant='ghost' onClick={props.onClose}>Cancel</Button>}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Popup