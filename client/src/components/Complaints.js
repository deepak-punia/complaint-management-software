import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Nav, Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	reslveComplaintwithid,
	loadUserComplaints,
} from "../actions/complaints";

const Complaints = (props) => {
	const complaints = props.complaints;
	const [details, setDetails] = useState(false);
	const dispatch = useDispatch();
	const location = useLocation();

	const handleDelete = (e, id) => {
		e.preventDefault();
		dispatch(reslveComplaintwithid(id));
	};

	//capatilize first letter of string
	const titleCase = (string) => {
		return string[0].toUpperCase() + string.slice(1).toLowerCase();
	};

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Priority</th>
					<th>Status</th>
					<th>Response</th>
					<th>Resolve</th>
					<th>Created by</th>
				</tr>
			</thead>
			<tbody>
				{complaints.map((item, idx) => (
					<tr key={idx}>
						<td>{idx + 1}</td>
						<td>
							<Link
								to={`${location.pathname}/?id=${item._id}`}
								onClick={(e) => setDetails(true)}
							>
								{titleCase(item.title)}
							</Link>
						</td>
						<td>{titleCase(item.priority)}</td>
						<td>{titleCase(item.status)}</td>
						<td>{item.replies.length}</td>
						<td>
							{item.status == "resolved" ? (
								<Button disabled={"true"} className="bg-success">Resolved</Button>
							) : (
								<Button onClick={(e) => handleDelete(e, item._id)}>
									Mark Resolved
								</Button>
							)}
						</td>
						<td>{titleCase(item.username)}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default Complaints;
