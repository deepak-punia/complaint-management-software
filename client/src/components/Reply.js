import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../actions/alert";
import Alerts from "./Alerts";
import {API_ENDPOINT} from '../actions/types';
import axios from 'axios';
import { loadComplaintwithid } from "../actions/complaints";


const Reply =  (props) => {
	const [reply, setReply] = useState("");
    const [uploadfile, setUploadfile] = useState('');

	const dispatch = useDispatch();
	//const user = useSelector((state) => state.auth);
	const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData()
        formData.append('reply', uploadfile);
        formData.append('reply', reply);

        //send data to server
        try {
			const response = await axios.post(
				`${API_ENDPOINT}/api/complaint/${props.id}`,
				formData
			);

            console.log(response);

			dispatch(setAlert("Response Added..", "success","reply"));
            dispatch(loadComplaintwithid(props.id))
		} catch (error) {
			console.log(error);
			dispatch(setAlert("Error! Please try again", "danger","reply"));
			
		}

	};

    //handle file upload
    const onFileChange=(e) =>{
        setUploadfile( e.target.files[0] )
    }
	return (
        <>
		
			<Row>
				<Alerts componentName={"reply"} />
			</Row>
			<Row>
				<Col>
					<Form>
						<h2>Reply </h2>
						<hr />
						<Form.Group className="mb-3" controlId="formBasicText">
							<Form.Label>Enter your response:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Your Response"
								value={reply}
								onChange={(e) => setReply(e.target.value)}
							/>
							
						</Form.Group>

						

                        <Form.Group controlId="formFile" className="mb-3">
                         <Form.Label>Attach Image</Form.Label>
                         <Form.Control type="file" onChange={onFileChange}/>
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
		
        </>
	);
};

export default Reply;