import {
	Box,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spinner,
} from "@chakra-ui/react";

export default function LoadingModal() {
	return (
		<Modal isOpen={true} onClose={() => {
		}}>
			<ModalOverlay/>
			<ModalContent>
				<ModalHeader>Processing</ModalHeader>
				<ModalCloseButton/>
				<ModalBody>
					<Box display="flex" justifyContent="center" alignItems="center">
						<Spinner size="xl"/>
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
