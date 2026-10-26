import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceImage from "../../assets/image/cambodia-wat-langka.jpg";
import { apiUrl, fileUrl } from "../frontend/request/Request";
const LatestService = () => {
  const [services, setServices] = useState([]);

  const fetchLatestService = async () => {
    try {
      const res = await fetch(apiUrl + "get-latest-services?limit=4", {
        method: "GET",
      });
      const result = await res.json();
      setServices(result.data ?? []);
    } catch {
      setServices([]);
    }
  };
  useEffect(() => {
    fetchLatestService();
  }, []);
  return (
    <>
      <section className="section-3 bg-light py-1">
        <div className="container-fluid py-5">
          <div className="section-header text-center">
            <span>OUR SERVICES</span>
            <h2>Our construction services</h2>
            <p>
              Local construction and renovation support for homes, businesses,
              and industrial sites across Cambodia.
            </p>
          </div>
          <div className="row pt-5">
            {services &&
              services.map((service) => {
                return (
                  <div className="col-md-3 col-lg-3" key={service.id}>
                    <div className="item">
                      <div className="serviceImage">
                        <img
                          src={service.image ? `${fileUrl}Upload/services/large/${service.image}` : ServiceImage}
                          alt={service.name}
                          className="w-100"
                        />
                      </div>
                      <div className="serviceBody">
                        <div className="serviceTitle">
                          <h3>{service.name}</h3>
                        </div>
                        <div className="serviceCotent">
                          <p>{service.description}</p>
                        </div>
                        <Link to="/service" className="btn btn-primary small">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestService;
