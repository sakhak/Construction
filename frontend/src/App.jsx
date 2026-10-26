import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/frontend/Home";
import About from "./component/frontend/About";
import "./assets/css/style.scss";
import MainLayout from "./component/mainlayout/MainLayout";
import ContactUs from "./component/frontend/ContactUs";
import Service from "./component/frontend/Service";
import Project from "./component/frontend/Project";
import Blogs from "./component/frontend/Blogs";
import Login from "./component/frontend/user/Login";
import Register from "./component/frontend/user/Register";
import Fogotpwd from "./component/frontend/user/Fogotpwd";
import { ToastContainer } from "react-toastify";
import Dashboard from "./component/frontend/dashboard/Dashboard";
import RequierAuth from "./component/common/RequierAuth";
import {default as ShowServie} from "./component/frontend/service/showService/ShowServie";
import CreateService from "./component/frontend/service/showService/CreateService";
import EditService from "./component/frontend/service/showService/EditService";
import ShowProject from "./component/frontend/project/ShowProject";
import CreateProject from "./component/frontend/project/CreateProject";
import EditProject from "./component/frontend/project/EditProject";
import ShowBlog from "./component/frontend/blog/ShowBlog";
import CreateBlog from "./component/frontend/blog/CreateBlog";
import EditBlog from "./component/frontend/blog/EditBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/fogotpwd" element={<Fogotpwd />} />

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route
              path="admin/dashboard"
              element={
                <RequierAuth>
                  <Dashboard />
                </RequierAuth>
              }
            />
            <Route
              path="admin/services"
              element={
                <RequierAuth>
                  <ShowServie />
                </RequierAuth>
              }
            />
            <Route
              path="admin/services/create"
              element={
                <RequierAuth>
                  <CreateService />
                </RequierAuth>
              }
            />
            <Route
              path="admin/services/edit/:id"
              element={
                <RequierAuth>
                  <EditService />
                </RequierAuth>
              }
            />
            <Route
              path="admin/projects"
              element={
                <RequierAuth>
                  <ShowProject />
                </RequierAuth>
              }
            />
            <Route
              path="admin/projects/create"
              element={
                <RequierAuth>
                  <CreateProject />
                </RequierAuth>
              }
            />
            <Route
              path="admin/projects/edit/:id"
              element={
                <RequierAuth>
                  <EditProject />
                </RequierAuth>
              }
            />
            <Route
              path="admin/articles"
              element={
                <RequierAuth>
                  <ShowBlog />
                </RequierAuth>
              }
            />
            <Route
              path="admin/articles/create"
              element={
                <RequierAuth>
                  <CreateBlog />
                </RequierAuth>
              }
            />
            <Route
              path="admin/articles/edit/:id"
              element={
                <RequierAuth>
                  <EditBlog />
                </RequierAuth>
              }
            />
            <Route path="about" element={<About />} />
            <Route path="contactus" element={<ContactUs />} />
            <Route path="service" element={<Service />} />
            <Route path="project" element={<Project />} />
            <Route path="blogs" element={<Blogs />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
