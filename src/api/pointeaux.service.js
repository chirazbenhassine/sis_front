import axios from 'axios';
import { BASE_URL } from "../config";

const url = `${BASE_URL}/pointeau`

export async function addPointeau(payload) {
  let response = await axios.post(url, payload);
  return response.data;
}

export async function getListPointeaux() {
  let response = await axios.get(url);
  return response.data;
}

export async function updatePointeau(data) {
  let response = await axios.put(`${url}/${data.id}`, data);
  return response.data;
}

export async function deletePointeau(id) {
  let response = await axios.delete(`${url}/${id}`);
  return response.data;
}

export async function getPointeauByName(name) {
  let response = await axios.get(`${url}/name/${name}`);
  return response.data;
}