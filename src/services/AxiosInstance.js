import axios from 'axios';



// *** API SETUP ***/
const token= JSON.parse(localStorage.getItem('cinema-auth-session'))?.state?.userData?.accessToken;


  const API = axios.create({ baseURL: `http://localhost:3000/api/` });
API.interceptors.request.use((req) => {
  req.headers['Authorization'] = `Bearer ${token}`;
  req.headers['Content-type'] = 'application/json';
  req.headers["Accept"] = 'application/json';
  return req;
});
export default API;




 
// export const API_FILE = axios.create({ baseURL: `http://lamp3.ncaa.gov.ng/` });
// API.interceptors.request.use((req) => {
//   req.headers['token'] = token;
//   req.headers['Content-type'] = 'multipart/form-data';
//   req.headers["Accept"] = 'multipart/form-data';
//   return req;
// });






