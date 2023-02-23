import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://63d8093a5dbd723244322e73.mockapi.io/',
	headers: {
		'content-type': 'application/json'
	}
});

export default instance;