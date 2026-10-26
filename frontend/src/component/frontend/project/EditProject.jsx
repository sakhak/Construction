import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../common/Sidebar";
import { apiUrl, fileUrl, token } from "../request/Request";
import { ProjectFormFields } from "./CreateProject";

const EditProject = () => {
  const [project, setProject] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(apiUrl + "project/" + params.id, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      setProject(result.data);
      return result.data;
    },
  });

  const onSubmit = async (data) => {
    setIsDisable(true);
    const res = await fetch(apiUrl + "project/" + params.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify({ ...data, imageId }),
    });
    const result = await res.json();
    setIsDisable(false);

    if (result.status === true) {
      toast.success(result.message);
      navigate("/admin/projects");
    } else {
      toast.error("Please check the project details.");
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(apiUrl + "image", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: formData,
      });
      const result = await response.json();

      if (result.status === true) {
        setImageId(result.image.id);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
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
                  <h4 className="h5">Edit Project</h4>
                  <Link to="/admin/projects" className="btn btn-primary">
                    Back
                  </Link>
                </div>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ProjectFormFields register={register} errors={errors} onFileChange={handleFile} />
                  {project?.image && (
                    <div className="pb-3">
                      <img
                        src={fileUrl + "Upload/projects/small/" + project.image}
                        alt={project.name}
                        style={{ width: "120px", height: "120px", objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <button disabled={isDisable} type="submit" className="btn btn-primary bgfull">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditProject;
