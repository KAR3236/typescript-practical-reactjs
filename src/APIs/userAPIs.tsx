import {
  ActiveUserInterface,
  LoginDataInterface,
  RegisterDataInterface,
} from "../Services/userInterface";
import { ACTIVE_USER_API, LOGIN_API, REGISTRATION_API } from "./APIs";
import { baseURL } from "./baseUrl";

export async function registrationAPI(data: RegisterDataInterface) {
  return await baseURL.post(REGISTRATION_API, data);
}

export async function activeUserAPI(data: ActiveUserInterface) {
  return await baseURL.put(ACTIVE_USER_API, data);
}

export async function loginAPI(data: LoginDataInterface) {
  return await baseURL.post(LOGIN_API, data);
}
