import axios from "axios";
import {
	LOAD_USER_COMPLAINTS,
    LOAD_COMPLAINTS_ERROR,
	API_ENDPOINT,
	LOAD_COMPLAINT_WITH_ID,
	RESOLVE_COMPLAINT_WITH_ID,
	ALL_USER_COMPLAINTS
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//Load User complaints
export const loadUserComplaints = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const response = await axios.get(`${API_ENDPOINT}/api/complaint/usercomplaints`);

		dispatch({
			type: LOAD_USER_COMPLAINTS,
			payload: response.data,
		});
	} catch (error) {
		console.log(error);
        dispatch(setAlert("Loading Failed! Please try again", "danger","dashboard"));
		dispatch({
			type: LOAD_COMPLAINTS_ERROR,
		});
	}
};

//Load All complaints
export const loadAllComplaints = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const response = await axios.get(`${API_ENDPOINT}/api/complaint`);

		dispatch({
			type: ALL_USER_COMPLAINTS,
			payload: response.data,
		});
	} catch (error) {
		console.log(error);
        dispatch(setAlert("Loading Failed! Please refresh page", "danger","moddashboard"));
		
	}
};


//Load  complaint with id
export const loadComplaintwithid = (id) => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const response = await axios.get(`${API_ENDPOINT}/api/complaint/${id}`);

		dispatch({
			type: LOAD_COMPLAINT_WITH_ID,
			payload: response.data,
		});
	} catch (error) {
		console.log(error);
        dispatch(setAlert("Loading Failed! Please try again", "danger","dashboard"));
		
	}
};

//Resolve complaint with id
export const reslveComplaintwithid = (id) => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const response = await axios.post(`${API_ENDPOINT}/api/complaint/status/${id}`);

		dispatch({
			type: RESOLVE_COMPLAINT_WITH_ID,
		});
		dispatch(loadAllComplaints());
	} catch (error) {
		console.log(error);
        dispatch(setAlert("Loading Failed! Please try again", "danger","dashboard"));
		
	}
};
