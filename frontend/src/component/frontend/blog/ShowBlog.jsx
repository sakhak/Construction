import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../common/Sidebar";
import { apiUrl, fileUrl, token } from "../request/Request";
import { DeleteIcon, EditIcon } from "../../common/ActionIcons";

const ShowBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await fetch(apiUrl + "blog", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    setBlogs(result.list ?? []);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDeleteBtn = async (id) => {
    if (!confirm("Are you sure want to delete?")) {
      return;
    }

    const res = await fetch(apiUrl + "blog/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();

    if (result.status === true) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <h4 className="h5">Articles</h4>
                  <Link to="/admin/articles/create" className="btn btn-primary">
                    Create Article
                  </Link>
                </div>
                <hr />
                <table className="table table-striped admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Slug</th>
                      <th>Author</th>
                      <th>Status</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr key={blog.id}>
                        <td>{blog.id}</td>
                        <td className="truncate-cell" title={blog.title}>{blog.title}</td>
                        <td className="truncate-cell" title={blog.slug}>{blog.slug}</td>
                        <td className="truncate-cell" title={blog.author}>{blog.author}</td>
                        <td>{blog.status == 1 ? "Active" : "Inactive"}</td>
                        <td>
                          {blog.image ? (
                            <a
                              href={`${fileUrl}Upload/blogs/large/${blog.image}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Image
                                src={`${fileUrl}Upload/blogs/small/${blog.image}`}
                                alt={blog.title}
                                rounded
                                thumbnail
                                style={{
                                  width: "64px",
                                  height: "64px",
                                  objectFit: "cover",
                                }}
                              />
                            </a>
                          ) : (
                            <div
                              className="d-flex align-items-center justify-content-center border rounded bg-light text-muted"
                              style={{ width: "64px", height: "64px" }}
                            >
                              No Image
                            </div>
                          )}
                        </td>
                        <td>
                          <Link
                            to={`/admin/articles/edit/${blog.id}`}
                            className="action-icon-btn edit"
                            title="Edit article"
                            aria-label={`Edit ${blog.title}`}
                          >
                            <EditIcon />
                          </Link>
                          <button
                            onClick={() => handleDeleteBtn(blog.id)}
                            className="action-icon-btn delete ms-2"
                            title="Delete article"
                            aria-label={`Delete ${blog.title}`}
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShowBlog;
