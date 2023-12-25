import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { loginValidation } from "../validation/userValidation";
import { loginAPI } from "../APIs/userAPIs";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { hideLoader, showLoader } from "../Redux/Slice/loaderSlice";

export default function Login() {
  const navigate = useNavigate();

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loader.loader);

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
            dispatch(hideLoader());
            Cookies.set("loginToken", loginData?.data?.data?.token, {
              expires: 1,
              path: "/",
            });
            toast.success(loginData?.data?.message);
            navigate("/dashboard");
          } else {
            dispatch(hideLoader());
            toast.error(loginData?.data?.message);
          }
        })
        .catch((error: any) => {
          if (error) {
            dispatch(hideLoader());
            toast.error(error?.response?.data?.message);
          }
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
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="floatingInput">Email</label>
                    {formik.touched.email && formik.errors.email ? (
                      <div style={{ color: "red" }}>{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {formik.touched.password && formik.errors.password ? (
                      <div style={{ color: "red" }}>
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      {isLoading ? (
                        <div className="loader-overlay">
                          <span className="loader">Loading...</span>
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </button>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
