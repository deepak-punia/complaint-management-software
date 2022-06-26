import { GET_USERS, ERROR_GET_USERS, UPDATE_USER_ROLE } from "../actions/types";

const initialState = {
	loading: true,
	users: null,
	user: null,
};
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload,
				loading: false,
			};
		case ERROR_GET_USERS:
			return {
				...state,
				users: null,
				loading: false,
			};
		case UPDATE_USER_ROLE:
			return state;
		default:
			return state;
	}
}
