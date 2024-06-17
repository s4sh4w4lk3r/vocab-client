"use client";

import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function DictionaryModalWrapper({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    function handleClosing() {
        router.back();
        onClose();
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClosing}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={handleClosing}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
