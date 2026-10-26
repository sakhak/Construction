import React, { useEffect, useState } from "react";
import Sidebar from "../../../common/Sidebar";
import { apiUrl, fileUrl, token } from "../../request/Request";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Image } from "react-bootstrap";
import { DeleteIcon, EditIcon } from "../../../common/ActionIcons";

const ShowServie = () => {
  const [services, setService] = useState([]);
  const fetchService = async () => {
    const res = await fetch(apiUrl + "service", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const result = await res.json();
    setService(result.list);
  };
  useEffect(() => {
    fetchService();
  }, []);

  const handleDeletBtn = async (id) => {
    if (confirm("Are you sure want to delete?")) {
      const res = await fetch(apiUrl + "service/" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      if (result.status === true) {
        const newService = services.filter((service) => service.id != id);
        setService(newService);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      // setService(result.list);
    }
  };

  return (
    <>
      <main className="">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              {/* Thia side bar */}
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between ">
                    <h4 className="h5">Services</h4>
                    <Link
                      to="/admin/services/create"
                      className="btn btn-primary"
                    >
                      Create Service
                    </Link>
                  </div>
                  <hr />
                  <table className="table table-striped admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Country</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services &&
                        services.map((service) => {
                          return (
                            <tr key={service.id}>
                              <td>{service.id}</td>
                              <td className="truncate-cell" title={service.name}>{service.name}</td>
                              <td className="truncate-cell" title={service.code}>{service.code}</td>
                              <td className="truncate-cell" title={service.from_country}>{service.from_country}</td>
                              <td>{service.price}</td>
                              <td>
                                {service.status == 1 ? "Active" : "Inactive"}
                              </td>
                              <td className="text-center justify-content-center">
                                {service?.image ? (
                                  <a
                                    href={`${fileUrl}Upload/services/large/${service.image}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Image
                                      src={`${fileUrl}Upload/services/small/${service.image}`}
                                      alt={service?.name ?? "Service image"}
                                      rounded
                                      thumbnail
                                      style={{
                                        width: "64px",
                                        height: "64px",
                                        objectFit: "cover",
                                      }}
                                      onError={(e) => {
                                        e.currentTarget.onerror = null;
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
                                  to={`/admin/services/edit/${service.id}`}
                                  className="action-icon-btn edit"
                                  title="Edit service"
                                  aria-label={`Edit ${service.name}`}
                                >
                                  <EditIcon />
                                </Link>
                                <button
                                  onClick={() => handleDeletBtn(service.id)}
                                  className="action-icon-btn delete ms-2"
                                  title="Delete service"
                                  aria-label={`Delete ${service.name}`}
                                >
                                  <DeleteIcon />
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
          </div>
        </div>
      </main>
    </>
  );
};

export default ShowServie;
