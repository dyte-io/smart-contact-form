import {
	Box,
	Button,
	Card,
	CardBody,
	Container,
	FormControl,
	FormLabel,
	Input,
	SimpleGrid,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react";

import React, {useState} from "react";
import StartCallModal from "../StartCallModal";
import ThanksModal from "../ThanksModal";
import axios from "axios";
import LoadingModal from "../LoadingModal";

const validFields = new Set();
// designation
validFields.add("vp");
validFields.add("director");
validFields.add("ceo");
validFields.add("founder");
validFields.add("president");
// regions
validFields.add("north america");
validFields.add("europe");
validFields.add("australia");
validFields.add("new zealand");
validFields.add("united states");

const ContactForm = () => {
	const [form, setForm] = useState(new FormData());
	const [showModal, setShowModal] = useState(false);
	const [showThanks, setShowThanks] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleInputChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const {name, value} = event.target;
		form.set(name, value);
		setForm(form);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		const email = form.get("email");
		const company = form.get("company");
		const name = form.get("name");

		let payload = {email};

		if (name) {
			const first_name = (form.get("name") as string).split(" ")[0];
			const last_name = (form.get("name") as string).split(" ")[1];
			// @ts-ignore
			payload = {...payload, first_name, last_name};
		}

		if (company) { // @ts-ignore
			payload = {...payload, company};
		}

		console.log(payload);

		axios
			.post("https://dyte-webhook.onrender.com/person-enrich", payload)
			.then(({data}) => {
				if (data.ok) {
					setLoading(false);
					const {person} = data.person;
					const org = person.organization;

					if (!org) {
						console.log(person);
						setShowThanks(true);
						return;
					}

					const region = org.country;
					const employeeSize = org.estimated_num_employees;
					const designation = person.seniority;
					const funding = org.total_funding;
					const companyRevenue = org.annual_revenue;

					console.log({person, backgroundCheck: {region, employeeSize, designation, funding, companyRevenue}});
					if (employeeSize < 50) {
						setShowThanks(true);
						return;
					}

					if (!validFields.has(region.toLowerCase())) {
						setShowThanks(true);
						return;
					}

					if ((!companyRevenue && !funding) || (companyRevenue < 1000000 && funding < 1000000)) {
						if (validFields.has(designation.toLowerCase())) {
							setShowModal(true);
							return;
						}
						setShowThanks(true);
						return;
					}

					setShowModal(true);
				} else {
					console.log("error");
					setLoading(false);
					return;
				}
			});
	};

	return (
		<Box>
			<Container pt={16}>
				<SimpleGrid columns={1} height="100%" alignItems="center">
					<Card
						border="1px solid rgba(0, 0, 0, 0.1)"
						borderTop="8px solid #4299E1"
					>
						<CardBody>
							<Text textAlign="center" fontWeight="bolder" fontSize="4xl">
								Contact us
							</Text>
							<br/>
							<form onSubmit={handleSubmit}>
								<SimpleGrid columns={[1, 1, 2, 2, 2]} spacing={6}>
									<FormControl>
										<FormLabel htmlFor="name">Name</FormLabel>
										<Input type="text" id="name" name="name" onChange={handleInputChange}/>
									</FormControl>

									<FormControl isRequired>
										<FormLabel htmlFor="email">Email</FormLabel>
										<Input type="email" id="email" name="email" onChange={handleInputChange}/>
									</FormControl>

									<FormControl>
										<FormLabel htmlFor="phone">Phone</FormLabel>
										<Input type="tel" id="phone" name="phone" onChange={handleInputChange}/>
									</FormControl>

									<FormControl>
										<FormLabel htmlFor="company">Company</FormLabel>
										<Input type="text" id="company" name="company" onChange={handleInputChange}/>
									</FormControl>
								</SimpleGrid>
								<VStack mt={6} spacing={6}>
									<FormControl>
										<FormLabel htmlFor="message">Message</FormLabel>
										<Textarea id="message" name="message" rows={5} onChange={handleInputChange}/>
									</FormControl>
									<Button type="submit" mt={4} width="100%" colorScheme="blue">Submit</Button>
								</VStack>
							</form>
						</CardBody>
					</Card>
				</SimpleGrid>
			</Container>
			<StartCallModal open={showModal} onClose={() => setShowModal(false)}/>
			<ThanksModal open={showThanks} onClose={() => setShowThanks(false)}/>
			{
				loading && <LoadingModal/>
			}
		</Box>
	);
};

export default ContactForm;
