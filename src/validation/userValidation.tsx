import * as Yup from "yup";

export const registrationValidation = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required(),
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  dob: Yup.string().required(),
  role: Yup.string().oneOf(["Admin", "User"]).required(),
});

export const activeUserValidation = Yup.object({
  email: Yup.string().email().required(),
  status: Yup.boolean().required(),
});

export const loginValidation = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required(),
});
