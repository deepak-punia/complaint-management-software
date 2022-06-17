import { useSelector, useDispatch } from "react-redux";
import { Alert, Container, Row, Col } from "react-bootstrap";

const Alerts = ({ componentName }) => {
	const alert = useSelector((state) => state.alert);

	return (
		alert !== null &&
		alert.length > 0 &&
		alert.map((item) => (
			<>
				{item.componentName === componentName ? (
					<Container className="my-1">
						<Row>
							<Col>
								<Alert key={item.id} variant={item.alertType}>
									{item.msg}
								</Alert>{" "}
							</Col>
						</Row>
					</Container>
				) : (
					<></>
				)}
			</>
		))
	);
};

export default Alerts;
