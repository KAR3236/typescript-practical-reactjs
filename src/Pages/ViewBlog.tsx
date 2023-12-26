import { Link, useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { hideLoader, showLoader, viewBlog } from "../Redux/Slice/blogSlice";
import { viewBlogAPI } from "../APIs/blogAPIs";
import { formatDate } from "../Helpers/formateDate";

export default function ViewBlog() {
  const { id } = useParams(); 

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.blog.loader);
  const viewBlogData = useSelector((state: any) => state.blog.data);

  useEffect(() => {
    dispatch(showLoader());
    viewBlogAPI(id)
      .then((listOfBlogData: any) => {
        if (listOfBlogData?.data?.code === 200) {
          dispatch(hideLoader());
          dispatch(viewBlog(listOfBlogData?.data?.data));
        }
      })
      .catch((error: any) => {
        if (error) {
          dispatch(hideLoader());
        }
      });
  }, [dispatch, id]);

  let data;

  if (isLoading) {
    data = (
      <div className="card-body">
        <div className="text-center mt-5 mb-5">
          <span className="spinner-border" />
        </div>
      </div>
    );
  } else {
    data = (
      <div className="card-body">
        <p className="text-muted">
          <b>Title:</b> {viewBlogData.title}
        </p>
        <p className="text-muted">
          <b>Description:</b> {viewBlogData.description}
        </p>
        <p className="text-muted">
          <b>Publised Date:</b> {formatDate(viewBlogData.publised_date)}
        </p>
        <p className="text-muted">
          <b>Modify Date:</b> {formatDate(viewBlogData.modify_date)}
        </p>
        <p className="text-muted">
          <b>Status:</b> {viewBlogData.status}
        </p>
        <p className="text-muted">
          <b>Author:</b> {viewBlogData.author}
        </p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">View Blog</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-info float-right" to="/dashboard">
              View All Projects
            </Link>
          </div>
          {data}
        </div>
      </div>
    </Layout>
  );
}
