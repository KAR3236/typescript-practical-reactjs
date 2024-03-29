import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { activeUserValidation } from "../validation/userValidation";
import { activeUserAPI } from "../APIs/userAPIs";
import { toast } from "react-toastify";
import { hideLoader, showLoader } from "../Redux/Slice/loaderSlice";
import { Button, Form, Input, Label } from "../Components/commonElements";

export default function ActiveUser() {
  const navigate = useNavigate();

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state?.loader?.loader);

  // Formik for validation and handle event by user
  const formik = useFormik({
    initialValues: {
      email: "",
      status: "true",
    },
    validationSchema: activeUserValidation,
    onSubmit: async (values) => {
      dispatch(showLoader());
      await activeUserAPI(values)
        .then((activeUserData: any) => {
          if (activeUserData?.data?.code === 202) {
            toast.success(activeUserData?.data?.message);
            navigate("/");
          } else {
            toast.error(activeUserData?.data?.message);
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
                  Active User
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
                  <div className="form-group mb-3">
                    <Label labelName="Status" htmlFor="status" />
                    <select
                      name="status"
                      id="status"
                      className="form-select"
                      value={formik?.values?.status}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      <option value="true">Active</option>
                      <option value="false">Deactive</option>
                    </select>
                    {formik?.touched?.status && formik?.errors?.status ? (
                      <div style={{ color: "red" }}>
                        {formik?.errors?.status}
                      </div>
                    ) : null}
                  </div>

                  <div className="d-grid">
                    <Button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      {isLoading ? (
                        <div className="loader-overlay">
                          <span className="loader">Loading...</span>
                        </div>
                      ) : (
                        "Submit"
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
