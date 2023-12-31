import axios from "axios";
import { env } from "../env";

const BASE_URL = env.REACT_APP_BASE_URL_API;

export async function FetchData(url, method, data = null) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = accessToken
      ? await axios({ method, url, data, headers })
      : await axios({ method, url, data });
    return response.data;
  } catch (error) {
    let data = error;
    if (!error.response) {
      data = {
        response: {
          data: {
            statusCode: 500,
            statusMessage: error.code,
            error: [error.message],
          },
        },
        status: 500,
      };
    } else if (accessToken) {
      if (error.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        window.location.href = "/";
      }
    }
    throw data;
  }
}

export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/rest/auth/login`,
  REGISTER: `${BASE_URL}/rest/auth/signup`,
  GET_USER_BY_ID: `${BASE_URL}/rest/users/me`,
  UPLOAD_CV: `${BASE_URL}/rest/resume/extract`,
  GET_ALL_DATA: `${BASE_URL}/rest/history/resume`,
  GET_ALL_TRANS: `${BASE_URL}/rest/history/resume/find-all`,
  GET_DETAIL_TRANS: (id) => `${BASE_URL}/rest/history/resume/find/${id}`,
};
