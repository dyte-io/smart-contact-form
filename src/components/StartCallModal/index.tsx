import {
  Button,
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, Text,
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export default function StartCallModal({open=false, onClose=() => {}}) {
  const navigate = useNavigate();
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Start Call</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Text>
            Click below to start a video call with our support agent !!
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => navigate("/join-call")}>
            Start Call
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
