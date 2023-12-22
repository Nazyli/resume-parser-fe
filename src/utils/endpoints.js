import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL_API;

export async function FetchData(url, method, data = null) {
  try {
    const accessToken = localStorage.getItem("accessToken");

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
            errorList: [error.message],
          },
        },
        status: 500,
      };
    } else if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      window.location.href = "/";
    }
    throw data;
  }
}

export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/rest/auth/login`,
  REGISTER: `${BASE_URL}/rest/auth/signup`,
  GET_USER_BY_ID: `${BASE_URL}/rest/users/me`,
  UPLOAD_CV: `${BASE_URL}/rest/resume/extract`,
};
