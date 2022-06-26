import { Card, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { loadComplaintwithid } from "../actions/complaints";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../actions/types";
import Reply from "./Reply";

const Complaint = (props) => {
	const id = props.id;
	const complaint = useSelector((state) => state.complaints.complaint);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	//capatilize first letter of string
	const titleCase = (string) => {
		return string[0].toUpperCase() + string.slice(1).toLowerCase();
	};

	useEffect(() => {
		dispatch(loadComplaintwithid(id)).then(() => {
			setLoading(true);
		});
	}, []);

	return (
		<>
			{loading ? (
				<>
					<Card className="my-1" border="dark" style={{ width: "100%" }}>
						<Card.Header>
							Created by: {titleCase(complaint.username)}
						</Card.Header>
						<Card.Body>
							<Card.Title>{titleCase(complaint.title)}</Card.Title>
							<Card.Text>Proirity: {titleCase(complaint.priority)}</Card.Text>
							<Card.Text>Status: {titleCase(complaint.status)}</Card.Text>
							<Card.Text>{complaint.details}</Card.Text>
							<Card.Text>
								{complaint.imagesdata.map((item, key) => {
									return item.url ? (
										<div key={key}>
											<Image
												className="w-50"
												fluid={"true"}
												thumbnail={"true"}
												src={`${API_ENDPOINT}/${item.url}`}
											/>
										</div>
									) : (
										<></>
									);
								})}
							</Card.Text>
						</Card.Body>
						<Card.Footer>
							<small className="text-muted">Posted at : {complaint.date}</small>
						</Card.Footer>
					</Card>

					{complaint.replies.map((complaint, key) => {
						return (
							<div key={key}>
								<Card
									className={
										complaint.userrole == "admin"
											? "my-1 border-danger"
											: complaint.userrole == "mod"
											? "my-1 border-primary"
											: "my-1"
									}
									style={{ width: "100%" }}
								>
									<Card.Header>
										Response by: {titleCase(complaint.username)} Role:{" "}
										{titleCase(complaint.userrole)}
									</Card.Header>
									<Card.Body>
										<Card.Text>{complaint.reply}</Card.Text>
										<Card.Text>
											{complaint.imagesdata.map((item, key) => {
												return item.url ? (
													<div key={key}>
														<Image
															className="w-50"
															fluid={"true"}
															thumbnail={"true"}
															src={`${API_ENDPOINT}/${item.url}`}
														/>
													</div>
												) : (
													<></>
												);
											})}
										</Card.Text>
									</Card.Body>
								</Card>
							</div>
						);
					})}

					<Card border="dark" style={{ width: "100%" }}>
						<Card.Body>
							<Reply id={id} />
						</Card.Body>
					</Card>
				</>
			) : (
				<>Loading...</>
			)}
		</>
	);
};

export default Complaint;
