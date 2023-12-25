import { Link } from "react-router-dom";
import Layout from "../Components/Layout";
import Cookies from "js-cookie";

export default function Dashboard() {
  const blogList: any = [
    {
      id: 1,
      title: "Demo1",
      description: "Description Demo 1",
      publised_date: "2023-12-11",
      modify_date: "2023-12-14",
      status: "Publish",
      author: "Kaushik Rathod",
    },
    {
      id: 2,
      title: "Demo2",
      description: "Description Demo 2",
      publised_date: "2023-12-12",
      modify_date: "2023-12-20",
      status: "Unpublish",
      author: "Chirag Ranpara",
    },
  ];

  const handleLogout = () => {
    Cookies.remove("loginToken");
    window.confirm("Are you sure you want to logout?");
  };

  const handleDelete = () => {
    window.confirm("Are you sure you want to delete?");
  };

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
                  <th>Title</th>
                  <th>Description</th>
                  <th>Publised Date</th>
                  <th>Modify Date</th>
                  <th>Status</th>
                  <th>Author</th>
                  <th style={{ width: "240px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {blogList.map((blog: any) => {
                  return (
                    <tr key={blog.id}>
                      <td>{blog.title}</td>
                      <td>{blog.description}</td>
                      <td>{blog.publised_date}</td>
                      <td>{blog.modify_date}</td>
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
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
