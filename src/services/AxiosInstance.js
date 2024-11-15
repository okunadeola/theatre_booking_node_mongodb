import axios from 'axios';



// *** API SETUP ***/

const API = axios.create({ baseURL: `https://theatre-booking-node-mongodb.onrender.com/api/` });
// const API = axios.create({ baseURL: `http://localhost:3000/api/` });




API.interceptors.request.use((req) => {
  const token= JSON.parse(localStorage.getItem('cinema-auth-session'))?.state?.userData?.data?.token;
  req.headers['Authorization'] = `Bearer ${token}`;
  req.headers['Content-type'] = 'application/json';
  req.headers["Accept"] = 'application/json';
  return req;
});

export default API;







