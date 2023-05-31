import {
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, Text,
} from "@chakra-ui/react";

export default function ThanksModal({open=false, onClose=() => {}}) {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Thank you !</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Text pb={4}>
            Thanks for reaching out, our experts will get back to you shortly.
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
