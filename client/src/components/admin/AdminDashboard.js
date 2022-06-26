import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Nav, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { loadAllComplaints } from "../../actions/complaints";
import { loadUsers } from "../../actions/users";
import Alerts from "../Alerts";
import Complaints from "../Complaints";
import Complaint from "../Complaint";
import Users from "./Users";
import BarChart from "../BarChart";
import InforCard from "../InfoCard";

const AdminDashboard = () => {
	const [displayComponent, setDisplayComponent] = useState("info");
	const [details, setDetails] = useState(false);
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth);
	const users = useSelector((state) => state.users.users);
	const complaints = useSelector((state) => state.complaints.allcomplaints);
	const dispatch = useDispatch();

	let search = window.location.search;
	let params = new URLSearchParams(search);
	let foo = params.get("id");

	useEffect(() => {
		if (!user.isAuthenticated || !user.user.role == "admin") {
			navigate("/");
		}

		dispatch(loadAllComplaints()).then(() => {
			dispatch(loadUsers()).then(() => {
				setDisplayComponent("dashboard");
			});
		});
	}, []);

	if (!user.isAuthenticated || !user.user.role == "admin") {
		navigate("/");
	}

	//switch to render different components
	const renderSwitch = (param) => {
		if (param == "complaints" && !foo) {
			return <Complaints complaints={complaints} />;
		} else if (foo) {
			return (
				<>
					<Link to={"/admin"}><Button>Go Back</Button></Link>
					<Complaint id={foo} />
				</>
			);
		} else if (param == "dashboard" && !foo) {
			const resolved = complaints.filter((item) => item.status == "resolved");
			const pending = complaints.filter((item) => item.status == "pending");
			const Prioritypending = pending.filter((item) => item.priority == "high");
			const mods = users.filter((item) => item.role == "mod");

			const data = [
				{ field: "Total Complaints", data: complaints.length },
				{ field: "Resolved", data: resolved.length },
				{ field: "Pending", data: pending.length },
				{ field: "High Priority Pending", data: Prioritypending.length },
			];
			return (
				<>
					<Card>
						<Row>
							<Col>
								<InforCard
									data={{
										title: "Users: ",
										field: users.length,
										style: "text-white bg-success",
									}}
								/>
							</Col>
							<Col>
								<InforCard
									data={{
										title: "Mods: ",
										field: mods.length,
										style: "text-white bg-warning",
									}}
								/>
							</Col>
							<Col>
								<InforCard
									data={{
										title: "Complaints: ",
										field: complaints.length,
										style: "text-white bg-danger",
									}}
								/>
							</Col>
						</Row>
					</Card>
					<BarChart data={data} />
				</>
			);
		} else if (param == "users" && !foo) {
			return <Users users={users} />;
		} else {
			return <>Loading...</>;
		}
	};

	return (
		<>
			<Container fluid>
				<Row>
					<Col sm={2} className="bg-primary min-vh-100">
						<div className="d-grid gap-2">
							<Button
								variant="primary"
								className="text-start"
								onClick={(e) => setDisplayComponent("dashboard")}
							>
								Dashboard
							</Button>
						</div>
						<div className="d-grid gap-2">
							<Button
								variant="primary"
								className="text-start"
								onClick={(e) => setDisplayComponent("complaints")}
							>
								Complaints
							</Button>
						</div>
						<div className="d-grid gap-2">
							<Button
								variant="primary"
								className="text-start"
								onClick={(e) => setDisplayComponent("users")}
							>
								Users
							</Button>
						</div>
					</Col>

					<Col sm={10} className="bg-white ">
						<Alerts componentName={"admindashboard"} />
						{renderSwitch(displayComponent)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default AdminDashboard;
