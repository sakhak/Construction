import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceImage from "../../assets/image/cambodia-wat-langka.jpg";
import { apiUrl, fileUrl } from "./request/Request";

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(apiUrl + "get-services");
        const result = await res.json();
        setServices(result.data ?? []);
      } catch {
        setError("Unable to load services right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <main>
        <section className="listing-hero service-hero">
          <div className="container">
            <div className="section-header text-center">
              <span>Our Services</span>
              <h2>Construction services in Cambodia</h2>
              <p>
                Construction and renovation support for homes, shops, offices,
                and industrial sites across Cambodia.
              </p>
            </div>
          </div>
        </section>

        <section className="listing-section py-5">
          <div className="container py-4">
            {loading && <div className="listing-status">Loading services...</div>}
            {error && <div className="listing-status error">{error}</div>}
            {!loading && !error && services.length === 0 && (
              <div className="listing-status">No services found.</div>
            )}

            <div className="row g-4">
              {services.map((service) => (
                <div className="col-md-6 col-xl-4" key={service.id}>
                  <article className="listing-card">
                    <div className="listing-image">
                      <img
                        src={service.image ? `${fileUrl}Upload/services/large/${service.image}` : ServiceImage}
                        alt={service.name}
                      />
                    </div>
                    <div className="listing-body">
                      <div>
                        <span className="listing-kicker">{service.from_country || "Construction"}</span>
                        <h3>{service.name}</h3>
                        <p>{service.description || "Professional construction service for planned project work."}</p>
                      </div>
                      <div className="listing-footer">
                        {service.price && <strong>USD {Number(service.price).toLocaleString()}</strong>}
                        <Link to="/contactus" className="btn btn-primary small">Request Quote</Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Service;
