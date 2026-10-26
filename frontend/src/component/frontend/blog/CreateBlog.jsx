import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../common/Sidebar";
import { apiUrl, token } from "../request/Request";

const CreateBlog = () => {
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    setIsDisable(true);
    const res = await fetch(apiUrl + "blog", {
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
      navigate("/admin/articles");
    } else {
      toast.error("Please check the article details.");
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setValue("title", title);
    setValue("slug", title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
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
                  <h4 className="h5">Create Article</h4>
                  <Link to="/admin/articles" className="btn btn-primary">
                    Back
                  </Link>
                </div>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <BlogFormFields
                    register={register}
                    errors={errors}
                    onFileChange={handleFile}
                    onTitleChange={handleTitleChange}
                  />
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

export const BlogFormFields = ({ register, errors, onFileChange, onTitleChange }) => {
  const titleRegister = register("title", { required: "This field is required" });

  return (
    <>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          placeholder="Title"
          className={`form-control ${errors.title && "is-invalid"}`}
          name={titleRegister.name}
          ref={titleRegister.ref}
          onBlur={titleRegister.onBlur}
          onChange={(e) => {
            titleRegister.onChange(e);
            if (onTitleChange) {
              onTitleChange(e);
            }
          }}
        />
        {errors.title && <span className="invalid-feedback">{errors.title?.message}</span>}
      </div>
      <div className="mb-3">
        <label className="form-label">Slug</label>
        <input
          type="text"
          placeholder="Slug"
          className={`form-control ${errors.slug && "is-invalid"}`}
          {...register("slug", { required: "This field is required" })}
        />
        {errors.slug && <span className="invalid-feedback">{errors.slug?.message}</span>}
      </div>
      <div className="mb-3">
        <label className="form-label">Author</label>
        <input type="text" placeholder="Author" className="form-control" {...register("author")} />
      </div>
      <div className="mb-3">
        <label className="form-label">Status</label>
        <select className="form-control" defaultValue="1" {...register("status")}>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Short Description</label>
        <textarea rows={3} placeholder="Short Description" className="form-control" {...register("short_description")} />
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea rows={6} placeholder="Content" className="form-control" {...register("content")} />
      </div>
      <div className="mb-3">
        <label className="form-label">Image</label>
        <input onChange={onFileChange} type="file" className="form-control" />
      </div>
    </>
  );
};

export default CreateBlog;
