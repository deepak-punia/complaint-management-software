import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { loadAllComplaints } from "../../actions/complaints";
import Alerts from "../Alerts";
import Complaints from "../Complaints";
import Complaint from "../Complaint";

const Dashboard = () => {
	const [displayComponent, setDisplayComponent] = useState("info");
	const [details, setDetails] = useState(false);
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth);
	const complaints = useSelector((state) => state.complaints.allcomplaints);
	const dispatch = useDispatch();

	let search = window.location.search;
	let params = new URLSearchParams(search);
	let foo = params.get("id");

	useEffect(() => {
		if (!user.isAuthenticated || !user.user.role === "mod") {
			navigate("/");
		}
		dispatch(loadAllComplaints()).then(() => {
			setDisplayComponent("complaints");
		});
	}, []);

	return (
		<>
			<Container fluid>
				<Row>
					<Col sm={2} className="bg-primary mh-100">
						<div className="d-grid gap-2">
							<Button
								variant="primary"
								className="text-start"
								onClick={(e) => setDisplayComponent("complaints")}
							>
								Dashboard
							</Button>
							
						</div>
					</Col>

					<Col sm={10} className="bg-white mh-100">
						<Alerts componentName={"moddashboard"} />
						{displayComponent === "createcomplaint" ? (
							<></>
						) : displayComponent === "complaints" && !foo ? (
							<Complaints complaints={complaints} />
						) : foo ? (
							<>
								<Link to={"/mod"}>Go Back</Link>
								<Complaint id={foo} />
							</>
						) : (
							<div> Loading...</div>
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Dashboard;
