import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../actions/alert";
import { loadUserComplaints } from "../actions/complaints";
import Alerts from "./Alerts";
import { API_ENDPOINT } from "../actions/types";
import axios from "axios";

const CreateComplaint = () => {
	const [title, setTitle] = useState("");
	const [priority, setPriority] = useState("medium");
	const [details, setDetails] = useState("");
	const [uploadfile, setUploadfile] = useState("");

	const dispatch = useDispatch();
	//const user = useSelector((state) => state.auth);
	const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("complaint", uploadfile);
		formData.append("title", title);
		formData.append("priority", priority);
		formData.append("details", details);

		//send data to server
		try {
			const response = await axios.post(
				`${API_ENDPOINT}/api/complaint`,
				formData
			);

			console.log(response);

			dispatch(setAlert("Complaint is created.", "success", "createComplaint"));
			dispatch(loadUserComplaints());
		} catch (error) {
			console.log(error);
			dispatch(
				setAlert("Error! Please try again", "danger", "createComplaint")
			);
		}
	};

	//handle file upload
	const onFileChange = (e) => {
		setUploadfile(e.target.files[0]);
	};
	return (
		<Container className="p-5 h-100 bg-light">
			<Row>
				<Alerts componentName={"createComplaint"} />
			</Row>
			<Row>
				<Col>
					<Form>
						<h2>Create a Complaint</h2>
						<hr />
						<Form.Group className="mb-3" controlId="formBasicText">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPriority">
							<Form.Label>Select Priority</Form.Label>
							<Form.Select
								aria-label="Default select example"
								value={priority}
								onChange={(e) => setPriority(e.target.value)}
							>
								<option value="high">High</option>
								<option value="medium">Medium</option>
								<option value="low">Low</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicDetails">
							<Form.Label>Details</Form.Label>
							<Form.Control
								type="text"
								placeholder="Details"
								value={details}
								onChange={(e) => setDetails(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="formFile" className="mb-3">
							<Form.Label>Attach Image</Form.Label>
							<Form.Control type="file" onChange={onFileChange} />
						</Form.Group>

						<Button
							variant="primary"
							type="submit"
							onClick={handleRegisterSubmit}
						>
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default CreateComplaint;
