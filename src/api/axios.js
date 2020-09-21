import axios from 'axios';

export default axios.create({
  baseURL: `https://www.api-football.com/demo/v2/`
});