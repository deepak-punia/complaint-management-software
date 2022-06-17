import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "./actions/alert";
import Alerts from './components/Alerts'

function App() {
	const dispatch = useDispatch();
	const alert = useSelector((state) => state.alert);
	const handleClick=(e)=>{
    e.preventDefault();
    dispatch(setAlert("IT WORKS!!", "success","app"));
  }
  return (
		<Container fluid className="bg-primary p-5">
			<Row>
				<Col className="text-center">
					<Button onClick={handleClick}>OK</Button>
          <Alerts componentName={"app"} />
				</Col>
			</Row>
		</Container>
	);
}

export default App;
