import { Link } from "react-router-dom";
import Layout from "../Components/Layout";
import { useState } from "react";

export default function EditBlog() {
  // const { id } = useParams();
    const current = new Date().toISOString().split("T")[0];
    const [publisedDate, setPublisedDate] = useState("");
    const [modifyDate, setModifyDate] = useState("");

    return (
      <Layout>
        <div className="container">
          <h2 className="text-center mt-5 mb-3">Update Blog</h2>
          <div className="card">
            <div className="card-header">
              <Link
                className="btn btn-outline-info float-right"
                to="/dashboard"
              >
                Back
              </Link>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    // onChange={(event) => {
                    //   setName(event.target.value);
                    // }}
                    // value={name}
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="description">Description</label>
                  <textarea
                    // value={description}
                    // onChange={(event) => {
                    //   setDescription(event.target.value);
                    // }}
                    className="form-control"
                    id="description"
                    rows={3}
                    name="description"
                  ></textarea>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="publisedDate">Publised Date</label>
                  <input
                    value={publisedDate}
                    onChange={(event) => {
                      setPublisedDate(event.target.value);
                    }}
                    className="form-control"
                    id="publisedDate"
                    type="date"
                    placeholder="Enter Date of birth"
                    name="birthdate"
                    max={current}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="modifyDate">Modify Date</label>
                  <input
                    value={modifyDate}
                    onChange={(event) => {
                      setModifyDate(event.target.value);
                    }}
                    className="form-control"
                    id="modifyDate"
                    type="date"
                    placeholder="Enter Date of birth"
                    name="birthdate"
                    max={current}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="">Status</label>
                  <select
                    className="form-select"
                    // value={product.productCategory}
                    // onChange={(evt) =>
                    //   setProduct({
                    //     ...product,
                    //     productCategory: evt.target.value,
                    //   })
                    // }
                  >
                    <option value="">Select status</option>
                    <option value="Publish">Publish</option>
                    <option value="Unpublish">Unpublish</option>
                  </select>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="author">Author</label>
                  <input
                    // onChange={(event) => {
                    //   setName(event.target.value);
                    // }}
                    // value={name}
                    type="text"
                    className="form-control"
                    id="author"
                    name="author"
                  />
                </div>
                <button
                  //   disabled={isSaving}
                  //   onClick={handleSave}
                  type="button"
                  className="btn btn-outline-primary mt-3"
                >
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
}