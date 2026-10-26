import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiUrl } from "./request/Request";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const res = await fetch(apiUrl + "contact-now", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setIsSubmitting(false);

    if (result.status === true) {
      reset();
      toast.success(result.message);
    } else {
      toast.error("Please enter your name and email.");
    }
  };

  return (
    <>
      <main>
        <section className="section-contactus py-5">
          <div className="container">
            <div className="section-header text-center">
              <span>Our Team</span>
              <h2>Contact Us</h2>
              <p>
                Planning a construction or renovation project in Cambodia?
                Send us your details and we will be in touch.
              </p>
            </div>
            <div className="row mt-5">
              <div className="col-md-3">
                <div className="card shadow border-0 p-4 mb-3">
                  <div className="card-body py-4">
                    <h3>Call Us</h3>
                    <div>
                      <a href="tel:+85516607238">(+855) 16 607 238</a>
                    </div>
                    <div>
                      <a href="tel:+85511726434">(+855) 11 726 434</a>
                    </div>

                    <h3 className="mt-4">Write Us</h3>
                    <div>
                      <a href="mailto:loeungsakhak438@gmail.com">loeungsakhak438@gmail.com</a>
                    </div>
                    <div>
                      <a href="mailto:loeungsakhak438@gmail.com">loeungsakhak438@gmail.com</a>
                    </div>

                    <h3 className="mt-4">Address</h3>
                    <div>
                      Loeung Sakhak Construction
                      <br /> Phnom Penh, Cambodia
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="card shadow border-0">
                  <div className="card-body p-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Name
                          </label>
                          <input
                            {...register("name", { required: "This field is required" })}
                            type="text"
                            className={`form-control form-control-lg ${errors.name && "is-invalid"}`}
                            placeholder="Enter name"
                          />
                          {errors.name && <span className="invalid-feedback">{errors.name.message}</span>}
                        </div>
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Email
                          </label>
                          <input
                            {...register("email", {
                              required: "This field is required",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                              },
                            })}
                            type="text"
                            className={`form-control form-control-lg ${errors.email && "is-invalid"}`}
                            placeholder="Email"
                          />
                          {errors.email && <span className="invalid-feedback">{errors.email.message}</span>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Phone Number
                          </label>
                          <input
                            {...register("phone")}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Phone number"
                          />
                        </div>
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Subject
                          </label>
                          <input
                            {...register("subject")}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Subject"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="" className="form-label">
                            Message
                          </label>
                          <textarea
                            {...register("message", { required: "This field is required" })}
                            rows={5}
                            placeholder="Message"
                            className={`form-control form-control-lg ${errors.message && "is-invalid"}`}
                          ></textarea>
                          {errors.message && <span className="invalid-feedback">{errors.message.message}</span>}
                      </div>
                      <div>
                        <button disabled={isSubmitting} className="btn btn-primary large">
                          SUBMIT
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactUs;
