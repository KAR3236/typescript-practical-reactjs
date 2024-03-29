import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { loginValidation } from "../validation/userValidation";
import { loginAPI } from "../APIs/userAPIs";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { hideLoader, showLoader } from "../Redux/Slice/loaderSlice";
import { Button, Form, Input, Label } from "../Components/commonElements";

export default function Login() {
  const navigate = useNavigate();

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state?.loader?.loader);

  // Formik for validation and handle event by user
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      dispatch(showLoader());
      await loginAPI(values)
        .then((loginData: any) => {
          if (loginData?.data?.code === 200) {
            Cookies.set("loginToken", loginData?.data?.data?.token, {
              expires: 1,
              path: "/",
            });
            toast.success(loginData?.data?.message);
            navigate("/dashboard");
          } else {
            toast.error(loginData?.data?.message);
          }
        })
        .catch((error: any) => {
          if (error) {
            toast.error(error?.response?.data?.message);
          }
        }).finally(() => {
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
                <h4 className="card-title text-center mb-5 fw-light fs-5">
                  Sign In
                </h4>
                <Form onSubmit={formik.handleSubmit}>
                  <div className="form-floating mb-3">
                    <Input
                      name="email"
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={formik?.values?.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <Label labelName="Email" htmlFor="floatingInput" />
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

                  <div className="d-grid">
                    <Button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      {isLoading ? (
                        <span className="spinner-border" />
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </div>
                  <hr className="my-4"></hr>

                  <div className="d-grid">
                    <Link
                      className="btn btn-outline-primary btn-login text-uppercase fw-bold"
                      to="/signup"
                    >
                      Create new account
                    </Link>
                  </div>
                  <hr className="my-4"></hr>

                  <div className="d-grid">
                    <Link
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      to="/activeUser"
                    >
                      Active your account
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
