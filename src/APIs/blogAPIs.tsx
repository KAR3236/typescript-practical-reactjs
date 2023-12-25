import Cookies from "js-cookie";
import { AddEditBlogDataInterface } from "../Services/blogInterface";
import { ADD_BLOG_API } from "./APIs";
import { baseURL } from "./baseUrl";

const token = Cookies.get("loginToken");

export async function addBlogAPI(data: AddEditBlogDataInterface) {
  return await baseURL.post(ADD_BLOG_API, data, {
    headers: {
      Authorization: token,
    },
  });
}
