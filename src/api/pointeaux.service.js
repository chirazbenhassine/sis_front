import axios from 'axios';
import { BASE_URL } from "../config";


export async function addPointeau(payload) {
  let response = await axios.post(BASE_URL + '/pointeau', payload);
  return response.data;
}

export async function getListPointeaux() {
  let response = await axios.get(BASE_URL + '/pointeau');
  return response.data;
}