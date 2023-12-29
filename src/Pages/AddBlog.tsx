import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { addEditBlogValidation } from "../validation/blogValidation";
import { hideLoader, showLoader } from "../Redux/Slice/loaderSlice";
import { toast } from "react-toastify";
import { addBlogAPI } from "../APIs/blogAPIs";
import { Button, Form, Input, Label, Select } from "../Components/commonElements";

export default function AddBlog() {
  const current = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state?.loader?.loader);

  // Formik for validation and handle event by user
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      publised_date: "",
      modify_date: "",
      status: "",
      category: "",
      author: "",
    },
    validationSchema: addEditBlogValidation,
    onSubmit: async (values) => {
      dispatch(showLoader());
      await addBlogAPI(values)
        .then((blogData: any) => {
          if (blogData?.data?.code === 201) {
            toast.success(blogData?.data?.message);
            navigate("/dashboard");
          } else {
            toast.error(blogData?.data?.message);
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
        <h2 className="text-center mt-5 mb-3">Create New Blog</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-info float-right" to="/dashboard">
              Back
            </Link>
          </div>
          <div className="card-body">
            <Form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <Label labelName="Title" htmlFor="title" />
                <Input
                  name="title"
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter title"
                  value={formik?.values?.title}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik?.touched?.title && formik?.errors?.title ? (
                  <div style={{ color: "red" }}>{formik?.errors?.title}</div>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <Label labelName="Description" htmlFor="description" />
                <textarea
                  name="description"
                  className="form-control"
                  id="description"
                  rows={3}
                  value={formik?.values?.description}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></textarea>
                {formik?.touched?.description && formik?.errors?.description ? (
                  <div style={{ color: "red" }}>
                    {formik?.errors?.description}
                  </div>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <Label labelName="Publised Date" htmlFor="publisedDate" />
                <Input
                  name="publised_date"
                  className="form-control"
                  id="publisedDate"
                  type="date"
                  max={current}
                  value={formik?.values?.publised_date}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik?.touched?.publised_date &&
                formik?.errors?.publised_date ? (
                  <div style={{ color: "red" }}>
                    {formik?.errors?.publised_date}
                  </div>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <Label labelName="Modify Date" htmlFor="modifyDate" />
                <Input
                  name="modify_date"
                  className="form-control"
                  id="modifyDate"
                  type="date"
                  max={current}
                  value={formik?.values?.modify_date}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik?.touched?.modify_date && formik?.errors?.modify_date ? (
                  <div style={{ color: "red" }}>
                    {formik?.errors?.modify_date}
                  </div>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <Label labelName="Status" htmlFor="status" />
                <Select
                  name="status"
                  id="status"
                  className="form-select"
                  value={formik?.values?.status}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  defaultOption="Select status"
                  defaultValue=""
                  options={["Publish", "Unpublish"]}
                />
                {formik?.touched?.status && formik?.errors?.status ? (
                  <div style={{ color: "red" }}>{formik?.errors?.status}</div>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <Label labelName="Category" htmlFor="category" />
                <Input
                  name="category"
                  type="number"
                  className="form-control"
                  id="category"
                  placeholder="Enter category"
                  value={formik?.values?.category}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik?.touched?.category && formik?.errors?.category ? (
                  <div style={{ color: "red" }}>{formik?.errors?.category}</div>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <Label labelName="Author" htmlFor="author" />
                <Input
                  name="author"
                  type="text"
                  className="form-control"
                  id="author"
                  placeholder="Enter author"
                  value={formik?.values?.author}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik?.touched?.author && formik?.errors?.author ? (
                  <div style={{ color: "red" }}>{formik?.errors?.author}</div>
                ) : null}
              </div>
              <Button className="btn btn-outline-primary mt-3" type="submit">
                {isLoading ? <span className="spinner-border" /> : "Add"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
