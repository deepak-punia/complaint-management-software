import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { makeUserMod, deleteUser } from "../../actions/users";

const Users = (props) => {
	const users = props.users;

	const dispatch = useDispatch();

	const handleDelete = (e, id) => {
		e.preventDefault();
        dispatch(deleteUser(id));
	};
	const handlemakemod = (e, id) => {
		e.preventDefault();
        dispatch(makeUserMod(id));
	};

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Username</th>
					<th>Email</th>
					<th>Role</th>
					<th>Make user MOD</th>
					<th>Delete User</th>
				</tr>
			</thead>
			<tbody>
				{users.map((item, idx) => (
					<tr key={idx}>
						<td>{idx + 1}</td>
						<td>{item.username}</td>
						<td>{item.email}</td>
						<td>{item.role}</td>

						<td>
							{item.role == "admin" || item.role == "mod" ? (
								<Button disabled={"true"}>Make Mod</Button>
							) : (
								<Button onClick={(e) => handlemakemod(e, item._id)}>
									Make Mod
								</Button>
							)}
						</td>
						<td>
							{item.role == "admin" ? (
								<Button disabled={"true"}>Delete User</Button>
							) : (
								<Button onClick={(e) => handleDelete(e, item._id)}>
									Delete User
								</Button>
							)}
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default Users;
