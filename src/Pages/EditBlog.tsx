import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, listOfBlog, showLoader } from "../Redux/Slice/blogSlice";
import { editBlogAPI, listOfBlogAPI, viewBlogAPI } from "../APIs/blogAPIs";
import { useFormik } from "formik";
import { addEditBlogValidation } from "../validation/blogValidation";
import { toast } from "react-toastify";
import { date } from "../Helpers/formateDate";

export default function EditBlog() {
  const { id } = useParams();
  const current = new Date().toISOString().split("T")[0];

  //Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.blog.loader);

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
      await editBlogAPI(id, values)
        .then((blogData: any) => {
          if (blogData?.data?.code === 202) {
            dispatch(hideLoader());
            toast.success(blogData?.data?.message);
            listOfBlogAPI().then((listOfBlogData: any) => {
              if (listOfBlogData?.data?.code === 200) {
                dispatch(listOfBlog(listOfBlogData?.data?.data));
              }
            });
            navigate("/dashboard");
          } else {
            dispatch(hideLoader());
            toast.error(blogData?.data?.message);
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

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        await viewBlogAPI(id).then((listOfBlogData: any) => {
          if (listOfBlogData?.data?.code === 200) {
            delete listOfBlogData?.data?.data.id;
            formik.setValues(listOfBlogData?.data?.data);
          }
        });
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    };
    fetchDataFromApi();
  }, [id]);

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Update Blog</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-info float-right" to="/dashboard">
              Back
            </Link>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  name="title"
                  type="text"
                  className="form-control"
                  id="title"
                  value={formik?.values?.title}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div style={{ color: "red" }}>{formik.errors.title}</div>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  id="description"
                  rows={3}
                  value={formik.values.description}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></textarea>
                {formik.touched.description && formik.errors.description ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.description}
                  </div>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label htmlFor="publisedDate">Publised Date</label>
                <input
                  name="publised_date"
                  className="form-control"
                  id="publisedDate"
                  type="date"
                  max={current}
                  value={date(formik.values.publised_date)}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.publised_date && formik.errors.publised_date ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.publised_date}
                  </div>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label htmlFor="modifyDate">Modify Date</label>
                <input
                  name="modify_date"
                  className="form-control"
                  id="modifyDate"
                  type="date"
                  max={current}
                  value={date(formik.values.modify_date)}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.modify_date && formik.errors.modify_date ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.modify_date}
                  </div>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label htmlFor="">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formik.values.status}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  <option value="">Select status</option>
                  <option value="Publish">Publish</option>
                  <option value="Unpublish">Unpublish</option>
                </select>
                {formik.touched.status && formik.errors.status ? (
                  <div style={{ color: "red" }}>{formik.errors.status}</div>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label htmlFor="author">Author</label>
                <input
                  name="author"
                  type="text"
                  className="form-control"
                  id="author"
                  value={formik.values.author}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.author && formik.errors.author ? (
                  <div style={{ color: "red" }}>{formik.errors.author}</div>
                ) : null}
              </div>
              <button className="btn btn-outline-primary mt-3" type="submit">
                {isLoading ? <span className="spinner-border" /> : "Edit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
