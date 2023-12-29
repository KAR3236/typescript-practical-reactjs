import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { registrationAPI } from "../APIs/userAPIs";
import { useFormik } from "formik";
import { registrationValidation } from "../validation/userValidation";
import { toast } from "react-toastify";
import { hideLoader, showLoader } from "../Redux/Slice/loaderSlice";
import {
  Button,
  Form,
  Input,
  Label,
  Select,
} from "../Components/commonElements";

export default function Registration() {
  const current = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state?.loader?.loader);

  // Formik for validation and handle event by user
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      dob: "",
      role: "",
    },
    validationSchema: registrationValidation,
    onSubmit: async (values) => {
      dispatch(showLoader());
      await registrationAPI(values)
        .then((registerData: any) => {
          if (registerData?.data?.code === 201) {
            toast.success(registerData?.data?.message);
            navigate("/");
          } else {
            toast.error(registerData?.data?.message);
          }
        })
        .catch((error: any) => {
          if (error) {
            toast.error(error?.response?.data?.message);
          }
        })
        .finally(() => {
          dispatch(hideLoader());
        });
    },
  });

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Create new account
                </h5>
                <Form onSubmit={formik.handleSubmit}>
                  <div className="form-floating mb-3">
                    <Input
                      name="email"
                      type="email"
                      className="form-control"
                      id="floatingemail"
                      placeholder="example@gmail.com"
                      value={formik?.values?.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <Label labelName="Email" htmlFor="floatingemail" />
                    {formik?.touched?.email && formik?.errors?.email ? (
                      <div style={{ color: "red" }}>
                        {formik?.errors?.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-floating mb-3">
                    <Input
                      name="password"
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={formik?.values?.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <Label labelName="Password" htmlFor="floatingPassword" />
                    {formik?.touched?.password && formik?.errors?.password ? (
                      <div style={{ color: "red" }}>
                        {formik?.errors?.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-floating mb-3">
                    <Input
                      name="first_name"
                      type="text"
                      className="form-control"
                      id="first_name"
                      placeholder="Kaushik"
                      value={formik?.values?.first_name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <Label labelName="First name" htmlFor="first_name" />
                    {formik?.touched?.first_name &&
                    formik?.errors?.first_name ? (
                      <div style={{ color: "red" }}>
                        {formik?.errors?.first_name}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-floating mb-3">
                    <Input
                      name="last_name"
                      type="text"
                      className="form-control"
                      id="last_name"
                      placeholder="Rathod"
                      value={formik?.values?.last_name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <Label labelName="Last name" htmlFor="last_name" />
                    {formik?.touched?.last_name && formik?.errors?.last_name ? (
                      <div style={{ color: "red" }}>
                        {formik?.errors?.last_name}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-floating mb-3">
                    <Input
                      name="dob"
                      className="form-control"
                      id="date"
                      type="date"
                      placeholder="Enter Date of birth"
                      max={current}
                      value={formik?.values?.dob}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <Label labelName="Date of birth" htmlFor="date" />
                    {formik?.touched?.dob && formik?.errors?.dob ? (
                      <div style={{ color: "red" }}>{formik?.errors?.dob}</div>
                    ) : null}
                  </div>
                  <div className="form-group mb-3">
                    <Label labelName="Role" htmlFor="role" />
                    <Select
                      name="role"
                      className="form-select"
                      id="role"
                      value={formik?.values?.role}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      defaultOption="Select your role"
                      defaultValue=""
                      options={["Admin", "User"]}
                    />
                    {formik?.touched?.role && formik?.errors?.role ? (
                      <div style={{ color: "red" }}>{formik?.errors?.role}</div>
                    ) : null}
                  </div>
                  <div className="d-grid">
                    <Button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      {isLoading ? (
                        <span className="spinner-border" />
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </div>
                  <hr className="my-4"></hr>

                  <div className="d-grid">
                    <Link
                      className="btn btn-outline-primary btn-login text-uppercase fw-bold"
                      to="/"
                    >
                      Log in
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
