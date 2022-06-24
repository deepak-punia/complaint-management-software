import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { login } from "../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import Alerts from "./Alerts";

const Login = () => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);
	const handleRegisterSubmit = (e) => {
		e.preventDefault();
		dispatch(login({ email, password: pass }));
	};
	return (
		<Container className="p-5 h-100 bg-light">
			<Row>
				<Alerts componentName={"login"} />
			</Row>
			<Row>
				<Col>
					<Form>
						<h2>Login</h2>
						<hr />
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={pass}
								onChange={(e) => setPass(e.target.value)}
							/>
						</Form.Group>

						<Button
							variant="primary"
							type="submit"
							onClick={handleRegisterSubmit}
						>
							Login
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;