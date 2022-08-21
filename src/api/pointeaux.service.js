import axios from 'axios';
import { BASE_URL } from "../config";


export async function addPointeau(payload) {

  console.log(payload);
  let response = await axios.post(url + 'pointeau', payload);
  return response.data;
}

export async function getListPointeaux() {
    console.log('gztefgafehazfeazgblugbazkdgbkazvdkazd')
  let response = await axios.get(BASE_URL + '/pointeau');
  return response.data;
}