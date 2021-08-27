import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader } from "./auth-header";

export const getSquad = () => {
  return axios.get(API_URL + "squad", {
    headers: authHeader(),
  });
};

export const getSquadById = (squadId) => {
  return axios.get(API_URL + "squad/" + squadId, {
    headers: authHeader(),
  });
};

export const postSquad = (data) => {
  return axios.post(
    API_URL + "squad",
    data,
    {
      headers: authHeader(),
    }
  );
};

export const updateSquad = (id, body) => {
  return axios.put(API_URL + "squad/" + id, body, {
    headers: authHeader(),
  });
};

export const deleteSquad = (id) => {
  return axios.delete(API_URL + "squad/" + id, {
    headers: authHeader(),
  });
};
