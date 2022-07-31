import axios from "axios";

import { API_URL } from "../Utils/API";
import { authHeader,FormData } from "./auth-header";

export const getAllUser = () => {
  return axios.get(API_URL + "user", {
    headers: authHeader(),
  });
};

export const getAllUserMemberService = () => {
  return axios.get(API_URL + "user/anggota", {
    headers: authHeader(),
  });
};

export const getDetailUserService = (id) => {
  return axios.get(API_URL + "user/" + id, {
    headers: authHeader(),
  });
};

export const getUserBySquadId = (squad, batch) => {
  return axios.get(
    `${API_URL}user/money?squad=${squad}&batch=${batch}&roles=Anggota`,
    {
      headers: authHeader(),
    }
  );
};

export const updateUserService = (id, data) => {
  return axios.put(API_URL + "user/" + id, data, {
    headers: authHeader(),
  });
};

export const deleteUserService = (id) => {
  return axios.delete(API_URL + "user/" + id, {
    headers: authHeader(),
  });
};

export const changePhotoProfile = (id, body) => {
  return axios.put(API_URL +'user/profile/'+id, body, {
    headers: FormData()
  })
}
