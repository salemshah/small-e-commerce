// register user
import axios from 'axios';
import url from '../utils/URL'

export default async function registerUser(data) {
  return await axios.post(`${url}/auth/local/register`, data)
    .catch(e => console.log(e));
}
