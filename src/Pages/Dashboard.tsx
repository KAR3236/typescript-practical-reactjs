import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogAPI, listOfBlogAPI } from "../APIs/blogAPIs";
import { useEffect } from "react";
import { formatDate } from "../Helpers/formateDate";
import { hideLoader, listOfBlog, showLoader } from "../Redux/Slice/blogSlice";
import { toast } from "react-toastify";
import { Button } from "../Components/commonElements";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      Cookies.remove("loginToken");
      navigate("/");
    }
  };

  function handleDelete(id: number) {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      deleteBlogAPI(id)
        .then((blogData: any) => {
          if (blogData?.data?.code === 200) {
            dispatch(hideLoader());
            toast.success(blogData?.data?.message);
            listOfBlogAPI().then((listOfBlogData: any) => {
              if (listOfBlogData?.data?.code === 200) {
                dispatch(listOfBlog(listOfBlogData?.data?.data));
              }
            });
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
    }
  }

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state?.blog?.loader);
  const blogList = useSelector((state: any) => state?.blog?.datas);

  useEffect(() => {
    dispatch(showLoader());
    const fetchDataFromApi = async () => {
      try {
        await listOfBlogAPI().then((listOfBlogData: any) => {
          if (listOfBlogData?.data?.code === 200) {
            dispatch(hideLoader());
            dispatch(listOfBlog(listOfBlogData?.data?.data));
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(hideLoader());
      }
    };
    fetchDataFromApi();
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
  } else if (blogList.length > 0) {
    tbodyContent = blogList.map((blog: any, index: number) => {
      return (
        <tr key={blog?.id}>
          <td>{index + 1}</td>
          <td>{blog?.title}</td>
          <td>{blog?.description}</td>
          <td>{formatDate(blog?.publised_date)}</td>
          <td>{formatDate(blog?.modify_date)}</td>
          <td>{blog?.status}</td>
          <td>{blog?.author}</td>
          <td>
            <Link
              to={`/viewBlog/${blog?.id}`}
              className="btn btn-outline-info mx-1"
            >
              View
            </Link>
            <Link
              className="btn btn-outline-success mx-1"
              to={`/editBlog/${blog?.id}`}
            >
              Edit
            </Link>
            <Button
              onClick={() => handleDelete(blog?.id)}
              className="btn btn-outline-danger mx-1"
              type="button"
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  } else {
    tbodyContent = (
      <tr>
        <th colSpan={8}>
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
            <Button
              className="btn btn-outline-danger float-end"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </Button>
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
