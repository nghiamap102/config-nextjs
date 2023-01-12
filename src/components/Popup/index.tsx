import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalProps } from "@chakra-ui/react";
import { FC } from 'react';

type PopupProps = {
    title?: string
} & ModalProps;

const Popup: FC<PopupProps> = ({ title, ...props }) => {
    return (
        <Modal {...props}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    abc
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                        Apply
                    </Button>
                    <Button variant='ghost'>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Popup