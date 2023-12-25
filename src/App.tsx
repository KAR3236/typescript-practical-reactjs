import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Pages/Dashboard";
import AddBlog from "./Pages/AddBlog";
import EditBlog from "./Pages/EditBlog";
import ViewBlog from "./Pages/ViewBlog";
import ActiveUser from "./Pages/ActiveUser";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/activeUser" element={<ActiveUser />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addBlog" element={<AddBlog />} />
          <Route path="/editBlog/:id" element={<EditBlog />} />
          <Route path="/viewBlog/:id" element={<ViewBlog />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
