import React, { useState } from "react";
import Sidebar from "../../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl, token } from "../../request/Request";
import { toast } from "react-toastify";

const CreateService = () => {
  const [isDisable, setisDisable] = useState(false);
  const [isImageId, setImageId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setisDisable(true);
    const newData = { ...data, imageId: isImageId };
    const res = await fetch(apiUrl + "service", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(newData),
    });
    const result = await res.json();
    setisDisable(false);
    if (result.status == true) {
      toast.success(result.message);
      navigate("/admin/services");
    } else {
      toast.error(result.message);
    }
  };
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
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

      if (result.status === false) {
        if (result.errors?.image) {
          toast.error(result.errors.image[0]);
        } else {
          toast.error("Image upload failed.");
        }
      } else {
        setImageId(result.image.id);
        toast.success("Image uploaded successfully!");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
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
                    <h4 className="h5">Create Service</h4>
                    <Link to="/admin/services" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr />
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        className={`form-control ${
                          errors.name && "is-invalid"
                        }`}
                        {...register("name", {
                          required: "This field is required",
                        })}
                      />
                      {errors.name && (
                        <span className="invalid-feedback">
                          {errors.name?.message}
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Code
                      </label>
                      <input
                        type="text"
                        placeholder="Code"
                        className={`form-control ${
                          errors.code && "is-invalid"
                        }`}
                        {...register("code", {
                          required: "This field is required",
                        })}
                      />
                      {errors.code && (
                        <span className="invalid-feedback">
                          {errors.code?.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Price
                      </label>
                      <input
                        type="text"
                        placeholder="Price"
                        className={`form-control ${
                          errors.price && "is-invalid"
                        }`}
                        {...register("price", {
                          required: "This field is required",
                        })}
                      />
                      {errors.price && (
                        <span className="invalid-feedback">
                          {errors.price?.message}
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">
                        Status
                      </label>
                      <select
                        id="status"
                        className="form-control"
                        defaultValue="1"
                        {...register("status")}
                      >
                        <option value="1">Active</option>
                        <option value="0">In Active</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        From Country
                      </label>
                      <input
                        type="text"
                        placeholder="Country"
                        className="form-control"
                        {...register("from_country")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Desctription
                      </label>
                      <textarea
                        rows={4}
                        type="text"
                        placeholder="Description"
                        className="form-control"
                        {...register("description")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Image
                      </label>
                      <input
                        onChange={handleFile}
                        type="file"
                        // placeholder="Image"
                        className="form-control"
                      />
                    </div>
                    <button
                      disabled={isDisable}
                      type="submit"
                      className="btn btn-primary bgfull"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateService;
