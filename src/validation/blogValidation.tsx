import * as Yup from "yup";

export const addEditBlogValidation = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  publised_date: Yup.string().required(),
  modify_date: Yup.string().required(),
  status: Yup.string().oneOf(["Publish", "Unpublish"]).required(),
  category: Yup.string().required(),
  author: Yup.string().required(),
});
