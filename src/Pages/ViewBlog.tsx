import { Link } from "react-router-dom";
import Layout from "../Components/Layout";

export default function ViewBlog() {
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
          <div className="card-body">
            <p className="text-muted">
              <b>Title:</b> {"project.title"}
            </p>
            <p className="text-muted">
              <b>Description:</b> {"project.description"}
            </p>
            <p className="text-muted">
              <b>Publised Date:</b> {"project.publised_date"}
            </p>
            <p className="text-muted">
              <b>Modify Date:</b> {"project.modify_date"}
            </p>
            <p className="text-muted">
              <b>Status:</b> {"project.status"}
            </p>
            <p className="text-muted">
              <b>Author:</b> {"project.author"}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
