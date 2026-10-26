import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AboutImg from "../../assets/image/cambodia-phnom-penh-skyline.jpg";
import BlogImage from "../../assets/image/cambodia-wat-langka.jpg";
import ProjectImage from "../../assets/image/cambodia-central-market.jpg";
import Icon1 from "../../assets/image/icon-1.svg";
import Icon2 from "../../assets/image/icon-2.svg";
import Icon3 from "../../assets/image/icon-3.svg";
import LatestService from "../common/LatestService";
import { apiUrl, fileUrl } from "./request/Request";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [projectRes, blogRes] = await Promise.all([
          fetch(apiUrl + "get-latest-projects?limit=4"),
          fetch(apiUrl + "get-latest-blogs?limit=3"),
        ]);

        const projectResult = await projectRes.json();
        const blogResult = await blogRes.json();
        setProjects(projectResult.data ?? []);
        setBlogs(blogResult.data ?? []);
      } catch {
        setProjects([]);
        setBlogs([]);
      }
    };

    fetchHomeData();
  }, []);

  const values = [
    {
      icon: Icon1,
      title: "Pre-Construction Planning",
      text: "Detailed scopes, quantity checks, budget controls, and realistic schedules before work begins.",
    },
    {
      icon: Icon2,
      title: "Site Quality Control",
      text: "Structured inspections for concrete, masonry, MEP coordination, finishing, and handover details.",
    },
    {
      icon: Icon3,
      title: "Clear Client Reporting",
      text: "Weekly progress updates, documented changes, and clear communication on cost and timeline.",
    },
  ];

  return (
    <main>
      <section className="section-1">
        <div className="hero d-flex align-items-center">
          <div className="container-fluid">
            <div className="text-center">
              <span>Construction and renovation in Cambodia</span>
              <h1>
                Building for Cambodia,
                <br />
                from planning to handover.
              </h1>
              <p>
                Construction support for homes, shop houses, offices, and
                commercial spaces in Phnom Penh and across Cambodia.
              </p>
              <div className="mt-4">
                <Link to="/contactus" className="btn btn-primary large">
                  Contact Now
                </Link>
                <Link to="/project" className="btn btn-secondary ms-3 large">
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-2 py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <img src={AboutImg} className="w-100" alt="Construction planning" />
            </div>
            <div className="col-md-6">
              <span>About us</span>
              <h2>Construction planning for projects in Cambodia</h2>
              <p>
                Loeung Sakhak Construction supports residential, shop house,
                commercial, and renovation work in Cambodia.
              </p>
              <p>
                Project planning considers local site conditions, seasonal
                rainfall, material availability, and clear communication at
                every stage.
              </p>
              <Link to="/about" className="btn btn-primary small">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LatestService />

      <section className="section-4 py-1">
        <div className="container py-5">
          <div className="section-header text-center">
            <span>Why Choose Us</span>
            <h2>How we deliver professional results</h2>
            <p>
              A dependable contractor should protect your budget, timeline,
              structure, and final finish.
            </p>
          </div>
          <div className="row pt-4">
            {values.map((value) => (
              <div className="col-md-4" key={value.title}>
                <div className="card shadow border-0 p-4">
                  <div className="card-icon">
                    <img src={value.icon} alt="" />
                  </div>
                  <div className="card-title mt-3">
                    <h3>{value.title}</h3>
                  </div>
                  <p>{value.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-3 bg-light py-1">
        <div className="container-fluid py-5">
          <div className="section-header text-center">
            <span>Projects</span>
            <h2>Construction work across Cambodia</h2>
            <p>
              Residential, commercial, industrial, and renovation work in
              Phnom Penh and other Cambodian provinces.
            </p>
          </div>
          <div className="row pt-5">
            {projects.map((project) => (
              <div className="col-md-3 col-lg-3" key={project.id}>
                <div className="item">
                  <div className="serviceImage">
                    <img
                      src={
                        project.image
                          ? `${fileUrl}Upload/projects/large/${project.image}`
                          : ProjectImage
                      }
                      alt={project.name}
                      className="w-100"
                    />
                  </div>
                  <div className="serviceBody">
                    <div className="serviceTitle">
                      <h3>{project.name}</h3>
                    </div>
                    <div className="serviceCotent">
                      <p>{project.descrioption}</p>
                    </div>
                    <Link to="/project" className="btn btn-primary small">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-5 py-5">
        <div className="container">
          <div className="section-header text-center">
            <span>Building in Cambodia</span>
            <h2>Local conditions matter</h2>
            <p>
              Plan for the site, the season, and the way each building will be
              used.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <article className="card shadow border-0 h-100">
                <div className="card-body p-4">
                  <h3>Rain and drainage</h3>
                  <p>Consider seasonal rainfall, site drainage, and weather exposure when planning the building and construction schedule.</p>
                </div>
              </article>
            </div>
            <div className="col-md-4">
              <article className="card shadow border-0 h-100">
                <div className="card-body p-4">
                  <h3>Materials and logistics</h3>
                  <p>Confirm material availability, delivery access, and lead times early, especially for sites outside major urban areas.</p>
                </div>
              </article>
            </div>
            <div className="col-md-4">
              <article className="card shadow border-0 h-100">
                <div className="card-body p-4">
                  <h3>Site-specific planning</h3>
                  <p>Review boundaries, access, utilities, and project requirements with the relevant local professionals before work begins.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-6 py-5 bg-light">
        <div className="container">
          <div className="section-header text-center">
            <span>Blog & News</span>
            <h2>Construction insights for Cambodia</h2>
            <p>
              Practical guidance for owners planning to build, renovate, or
              manage construction work in Cambodia.
            </p>
          </div>
          <div className="row pt-3">
            {blogs.map((blog) => (
              <div className="col-md-4" key={blog.id}>
                <div className="card shadow border-0">
                  <div className="card-image">
                    <img
                      src={
                        blog.image
                          ? `${fileUrl}Upload/blogs/large/${blog.image}`
                          : BlogImage
                      }
                      alt={blog.title}
                      className="w-100"
                    />
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-2">
                      <Link to="/blogs" className="title">
                        {blog.title}
                      </Link>
                    </div>
                    <p>{blog.short_description}</p>
                    <Link to="/blogs" className="btn btn-primary small">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
