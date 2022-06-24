import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "./actions/alert";
import { useEffect, useState } from "react";
import Alerts from "./components/Alerts";
import Login from "./components/Login";
import Register from "./components/Register";
import { loadUser } from "./actions/auth";
import { useNavigate } from "react-router-dom";

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.auth);
	const alert = useSelector((state) => state.alert);

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	// if (user.isAuthenticated && user.user.role === "user") {
	// 	navigate("/dashboard");
	// } else if (user.isAuthenticated && user.user.role === "admin") {
	// 	navigate("/admin");
	// }else if (user.isAuthenticated && user.user.role === "mod") {
	// 	navigate("/mod");
	// }
	return (
		<>
			<Container fluid className="bg-primary vh-100">
				<Row>
					<Col sm={7} className="bg-primary vh-100">
						<h1 className="text-white text-center">Complaint Management Software</h1>
					</Col>
					<Col sm={5} className="bg-white vh-100">
						<Col>
							<Tabs
								defaultActiveKey="login"
								id="uncontrolled-tab-example"
								className="mb-3"
							>
								<Tab eventKey="login" title="Login">
									<Login />
								</Tab>
								<Tab eventKey="register" title="Register">
									<Register />
								</Tab>
							</Tabs>
						</Col>
					</Col>
				</Row>

				{/* <Row>
    <Col className='text-center'><Alerts componentName={"app"}/></Col>
  </Row>
  <Row>
    <Col className='text-center'><Register /></Col>
    <Col className='text-center'><Login /></Col>
  </Row> */}
			</Container>
		</>
	);
}

export default App;
