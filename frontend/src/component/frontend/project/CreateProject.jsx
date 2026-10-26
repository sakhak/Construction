import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../common/Sidebar";
import { apiUrl, token } from "../request/Request";

const CreateProject = () => {
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsDisable(true);
    const res = await fetch(apiUrl + "project", {
      method: "POST",
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
                  <h4 className="h5">Create Project</h4>
                  <Link to="/admin/projects" className="btn btn-primary">
                    Back
                  </Link>
                </div>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ProjectFormFields register={register} errors={errors} onFileChange={handleFile} />
                  <button disabled={isDisable} type="submit" className="btn btn-primary bgfull">
                    Submit
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

export const ProjectFormFields = ({ register, errors, onFileChange }) => (
  <>
    <div className="mb-3">
      <label className="form-label">Name</label>
      <input
        type="text"
        placeholder="Name"
        className={`form-control ${errors.name && "is-invalid"}`}
        {...register("name", { required: "This field is required" })}
      />
      {errors.name && <span className="invalid-feedback">{errors.name?.message}</span>}
    </div>
    <div className="mb-3">
      <label className="form-label">Code</label>
      <input
        type="text"
        placeholder="Code"
        className={`form-control ${errors.code && "is-invalid"}`}
        {...register("code", { required: "This field is required" })}
      />
      {errors.code && <span className="invalid-feedback">{errors.code?.message}</span>}
    </div>
    <div className="mb-3">
      <label className="form-label">Status</label>
      <select className="form-control" defaultValue="1" {...register("status")}>
        <option value="1">Active</option>
        <option value="0">Inactive</option>
      </select>
    </div>
    <div className="mb-3">
      <label className="form-label">From Country</label>
      <input type="text" placeholder="Country" className="form-control" {...register("from_country")} />
    </div>
    <div className="mb-3">
      <label className="form-label">Location</label>
      <input type="text" placeholder="Location" className="form-control" {...register("location")} />
    </div>
    <div className="mb-3">
      <label className="form-label">Construction Type</label>
      <input
        type="text"
        placeholder="Construction Type"
        className="form-control"
        {...register("construction_type")}
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Description</label>
      <textarea rows={4} placeholder="Description" className="form-control" {...register("descrioption")} />
    </div>
    <div className="mb-3">
      <label className="form-label">Image</label>
      <input onChange={onFileChange} type="file" className="form-control" />
    </div>
  </>
);

export default CreateProject;
