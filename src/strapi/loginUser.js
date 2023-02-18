//login user
import axios from 'axios';
import url from '../utils/URL';

export default async function loginUser({email, password}) {
  return await axios.post(`${url}/auth/local`,
    {
      identifier: email,
      password
    }).catch(e => console.log(e));
}
