import {
	LOAD_USER_COMPLAINTS,
	LOAD_COMPLAINTS_ERROR,
	LOAD_COMPLAINT_WITH_ID,
	RESOLVE_COMPLAINT_WITH_ID,
	ALL_USER_COMPLAINTS
} from "../actions/types";

const initialState = {
	loading: true,
	complaints: null,
	complaint: null,
	allcomplaints: null,
};
export default function (state = initialState, action) {
	switch (action.type) {
		case LOAD_USER_COMPLAINTS:
			return {
				...state,
				complaints: action.payload,
				loading: false,
			};
		case ALL_USER_COMPLAINTS:
			return {
				...state,
				allcomplaints: action.payload,
				loading: false,
			}
		case LOAD_COMPLAINT_WITH_ID:
			return {
				...state,
				complaint: action.payload,
				loading: false,
			};
		case LOAD_COMPLAINTS_ERROR:
			return {
				...state,
				complaints: null,
				complaint: null,
				loading: false,
			};
		case RESOLVE_COMPLAINT_WITH_ID:
			return state;
		default:
			return state;
	}
}
