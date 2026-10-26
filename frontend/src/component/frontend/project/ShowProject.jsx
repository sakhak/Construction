import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../common/Sidebar";
import { apiUrl, fileUrl, token } from "../request/Request";
import { DeleteIcon, EditIcon } from "../../common/ActionIcons";

const ShowProject = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await fetch(apiUrl + "project", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    setProjects(result.list ?? []);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteBtn = async (id) => {
    if (!confirm("Are you sure want to delete?")) {
      return;
    }

    const res = await fetch(apiUrl + "project/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();

    if (result.status === true) {
      setProjects(projects.filter((project) => project.id !== id));
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
                  <h4 className="h5">Projects</h4>
                  <Link to="/admin/projects/create" className="btn btn-primary">
                    Create Project
                  </Link>
                </div>
                <hr />
                <table className="table table-striped admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Location</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td>{project.id}</td>
                        <td className="truncate-cell" title={project.name}>{project.name}</td>
                        <td className="truncate-cell" title={project.code}>{project.code}</td>
                        <td className="truncate-cell" title={project.location}>{project.location}</td>
                        <td className="truncate-cell" title={project.construction_type}>{project.construction_type}</td>
                        <td>{project.status == 1 ? "Active" : "Inactive"}</td>
                        <td>
                          {project.image ? (
                            <a
                              href={`${fileUrl}Upload/projects/large/${project.image}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Image
                                src={`${fileUrl}Upload/projects/small/${project.image}`}
                                alt={project.name}
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
                            to={`/admin/projects/edit/${project.id}`}
                            className="action-icon-btn edit"
                            title="Edit project"
                            aria-label={`Edit ${project.name}`}
                          >
                            <EditIcon />
                          </Link>
                          <button
                            onClick={() => handleDeleteBtn(project.id)}
                            className="action-icon-btn delete ms-2"
                            title="Delete project"
                            aria-label={`Delete ${project.name}`}
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

export default ShowProject;
