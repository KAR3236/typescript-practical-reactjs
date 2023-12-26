import Cookies from "js-cookie";
import { AddEditBlogDataInterface } from "../Services/blogInterface";
import { ADD_BLOG_API, DELETE_BLOG_API, EDIT_BLOG_API, LIST_OF_BLOG_API, VIEW_BLOG_API } from "./APIs";
import { baseURL } from "./baseUrl";

const token = Cookies.get("loginToken");

export async function addBlogAPI(data: AddEditBlogDataInterface) {
  return await baseURL.post(ADD_BLOG_API, data, {
    headers: {
      Authorization: token,
    },
  });
}

export async function listOfBlogAPI() {
  return await baseURL.get(LIST_OF_BLOG_API, {
    headers: {
      Authorization: token,
    },
  });
}

export async function viewBlogAPI(id: string | undefined) {
  return await baseURL.get(`${VIEW_BLOG_API}/${id}`, {
    headers: {
      Authorization: token,
    },
  });
}

export async function editBlogAPI(
  id: string | undefined,
  data: AddEditBlogDataInterface
) {
  return await baseURL.put(`${EDIT_BLOG_API}/${id}`, data, {
    headers: {
      Authorization: token,
    },
  });
}

export async function deleteBlogAPI(id: number) {
  return await baseURL.delete(`${DELETE_BLOG_API}/${id}`, {
    headers: {
      Authorization: token,
    },
  });
}
