import axios from 'axios';

const api = axios.create({
	//baseURL: 'http://ec2-18-222-221-231.us-east-2.compute.amazonaws.com:3001'
    //baseURL: 'http://ec2-3-16-180-219.us-east-2.compute.amazonaws.com:3000'
    //baseURL: 'http://localhost:3001'
    baseURL: 'https://api-twitter-dev.herokuapp.com/'
});

export default api;