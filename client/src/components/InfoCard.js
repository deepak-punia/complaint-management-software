import { Card } from "react-bootstrap";

const InforCard = ({ data }) => {
	return (
		<Card className={data.style} style={{ width: "18rem" }}>
			<Card.Body>
				<Card.Title>{data.title}</Card.Title>

				<Card.Text className="text-center">
					<h1>{data.field ? data.field : "No data available."}</h1>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default InforCard;
