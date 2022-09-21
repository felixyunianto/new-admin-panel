import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader, FormData } from "./auth-header";

export const getAllEventService = () => {
  return axios.get(API_URL + "events", {
    headers: authHeader(),
  });
};

export const getEventByIdService = (id) => {
  return axios.get(API_URL + "events/" + id, {
    headers: authHeader(),
  });
};

export const postEventService = (data) => {
  return axios.post(API_URL + "events", data, {
    headers: FormData(),
  });
};

export const updateEventService = (data, id) => {
  return axios.put(API_URL + "events/" + id, data, {
    headers: FormData(),
  });
};

export const deleteEventService = (id) => {
  return axios.delete(API_URL + "events/" + id, {
    headers: authHeader(),
  });
};

export const getAllMemberOprecService = () => {
  return axios.get(API_URL+ "prospective-member", {
    headers: authHeader()
  })
}

