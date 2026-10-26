import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectImage from "../../assets/image/cambodia-central-market.jpg";
import { apiUrl, fileUrl } from "./request/Request";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(apiUrl + "get-projects");
        const result = await res.json();
        setProjects(result.data ?? []);
      } catch {
        setError("Unable to load projects right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main>
      <section className="listing-hero project-hero">
        <div className="container">
          <div className="section-header text-center">
            <span>Projects</span>
            <h2>Construction projects in Cambodia</h2>
            <p>
              Explore residential, commercial, renovation, and civil-work
              examples from locations across Cambodia.
            </p>
          </div>
        </div>
      </section>

      <section className="listing-section py-5">
        <div className="container py-4">
          {loading && <div className="listing-status">Loading projects...</div>}
          {error && <div className="listing-status error">{error}</div>}
          {!loading && !error && projects.length === 0 && (
            <div className="listing-status">No projects found.</div>
          )}

          <div className="row g-4">
            {projects.map((project) => (
              <div className="col-md-6 col-xl-4" key={project.id}>
                <article className="listing-card">
                  <div className="listing-image">
                    <img
                      src={project.image ? `${fileUrl}Upload/projects/large/${project.image}` : ProjectImage}
                      alt={project.name}
                    />
                  </div>
                  <div className="listing-body">
                    <div>
                      <span className="listing-kicker">
                        {project.construction_type || "Project"}
                      </span>
                      <h3>{project.name}</h3>
                      <p>{project.descrioption || "Completed construction project with careful planning and site execution."}</p>
                    </div>
                    <div className="listing-meta">
                      {project.location && <span>{project.location}</span>}
                      {project.from_country && <span>{project.from_country}</span>}
                    </div>
                    <Link to="/contactus" className="btn btn-primary small">Start Similar Project</Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Project;
