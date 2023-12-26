import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { registrationAPI } from "../APIs/userAPIs";
import { useFormik } from "formik";
import { registrationValidation } from "../validation/userValidation";
import { toast } from "react-toastify";
import { hideLoader, showLoader } from "../Redux/Slice/loaderSlice";

export default function Registration() {
  const current = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loader.loader);

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
            dispatch(hideLoader());
            toast.success(registerData?.data?.message);
            navigate("/");
          } else {
            dispatch(hideLoader());
            toast.error(registerData?.data?.message);
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
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Create new account
                </h5>
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      id="floatingemail"
                      placeholder="example@gmail.com"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="floatingemail">Email</label>
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
                  <div className="form-floating mb-3">
                    <input
                      name="first_name"
                      type="text"
                      className="form-control"
                      id="first_name"
                      placeholder="Kaushik"
                      value={formik.values.first_name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="first_name">First name</label>
                    {formik.touched.first_name && formik.errors.first_name ? (
                      <div style={{ color: "red" }}>
                        {formik.errors.first_name}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      name="last_name"
                      type="text"
                      className="form-control"
                      id="last_name"
                      placeholder="Rathod"
                      value={formik.values.last_name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="last_name"> Last name</label>
                    {formik.touched.last_name && formik.errors.last_name ? (
                      <div style={{ color: "red" }}>
                        {formik.errors.last_name}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      name="dob"
                      className="form-control"
                      id="date"
                      type="date"
                      placeholder="Enter Date of birth"
                      max={current}
                      value={formik.values.dob}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="date">Date of birth</label>
                    {formik.touched.dob && formik.errors.dob ? (
                      <div style={{ color: "red" }}>{formik.errors.dob}</div>
                    ) : null}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="">Role</label>
                    <select
                      name="role"
                      className="form-select"
                      value={formik.values.role}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select your role</option>
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? (
                      <div style={{ color: "red" }}>{formik.errors.role}</div>
                    ) : null}
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      {isLoading ? (
                        <span className="spinner-border" />
                      ) : (
                        "Sign Up"
                      )}
                    </button>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
