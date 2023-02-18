import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalProps } from "@chakra-ui/react";
import { ButtonPrimary } from "@components/Button";
import { Ref } from "models/common";
import { forwardRef } from 'react';

type PopupProps = {
    title?: string
    cancel?: boolean
    onApply?: () => void
} & ModalProps;

const Popup = forwardRef<Ref, PopupProps>((props, ref) => {
    const { title, children, cancel, onApply } = props
    return (
        <Modal {...props}>
            <ModalOverlay ref={ref} />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
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
})

Popup.displayName = 'Popup'

export default Popup