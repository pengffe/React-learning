import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-my-burger-c3164-default-rtdb.firebaseio.com/'
});

export default instance;