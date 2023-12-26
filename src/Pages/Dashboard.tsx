import { Link } from "react-router-dom";
import Layout from "../Components/Layout";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoader,
  listOfBlog,
  showLoader,
} from "../Redux/Slice/dashboardSlice";
import { listOfBlogAPI } from "../APIs/blogAPIs";
import { useEffect } from "react";
import { formatDate } from "../Helpers/formateDate";

export default function Dashboard() {
  const handleLogout = () => {
    Cookies.remove("loginToken");
    window.confirm("Are you sure you want to logout?");
  };

  const handleDelete = () => {
    window.confirm("Are you sure you want to delete?");
  };

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.dashboard.loader);
  const blogList = useSelector((state: any) => state.dashboard.data);

  useEffect(() => {
    dispatch(showLoader());
    listOfBlogAPI()
      .then((listOfBlogData: any) => {
        if (listOfBlogData?.data?.code === 200) {
          dispatch(hideLoader());
          dispatch(listOfBlog(listOfBlogData?.data?.data));
        }
      })
      .catch((error: any) => {
        if (error) {
          dispatch(hideLoader());
        }
      });
  }, [dispatch]);

  let tbodyContent;

  if (isLoading) {
    tbodyContent = (
      <tr>
        <th colSpan={7}>
          <div className="text-center mt-5 mb-5">
            <span className="spinner-border" />
          </div>
        </th>
      </tr>
    );
  } else if (blogList) {
    tbodyContent = blogList.map((blog: any, index: number) => {
      return (
        <tr key={blog.id}>
          <td>{index + 1}</td>
          <td>{blog.title}</td>
          <td>{blog.description}</td>
          <td>{formatDate(blog.publised_date)}</td>
          <td>{formatDate(blog.modify_date)}</td>
          <td>{blog.status}</td>
          <td>{blog.author}</td>
          <td>
            <Link
              to={`/viewBlog/${blog.id}`}
              className="btn btn-outline-info mx-1"
            >
              View
            </Link>
            <Link
              className="btn btn-outline-success mx-1"
              to={`/editBlog/${blog.id}`}
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-outline-danger mx-1"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  } else {
    tbodyContent = (
      <tr>
        <th colSpan={7}>
          <div className="text-center mt-5 mb-5">Data not found...</div>
        </th>
      </tr>
    );
  }

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Blog Manager</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-primary" to="/addBlog">
              Create New Blog
            </Link>
            <Link
              className="btn btn-outline-danger float-end"
              to="/"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Publised Date</th>
                  <th>Modify Date</th>
                  <th>Status</th>
                  <th>Author</th>
                  <th style={{ width: "226px" }}>Action</th>
                </tr>
              </thead>
              <tbody>{tbodyContent}</tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
