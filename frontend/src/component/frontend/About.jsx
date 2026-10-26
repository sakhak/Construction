import { Link } from "react-router-dom";
import AboutImg from "../../assets/image/cambodia-phnom-penh-skyline.jpg";
import TeamImg from "../../assets/image/cambodia-central-market.jpg";
import Icon1 from "../../assets/image/icon-1.svg";
import Icon2 from "../../assets/image/icon-2.svg";
import Icon3 from "../../assets/image/icon-3.svg";

const About = () => {
  const stats = [
    { value: "Cambodia", label: "Local project focus" },
    { value: "Phnom Penh", label: "Based in the capital" },
    { value: "Homes and businesses", label: "Project types" },
    { value: "Site-specific", label: "Planning approach" },
  ];

  const values = [
    {
      icon: Icon1,
      title: "Pre-Construction Control",
      text: "Every job starts with drawings review, scope alignment, quantity checks, and procurement planning.",
    },
    {
      icon: Icon2,
      title: "Cambodia-aware Planning",
      text: "We consider local site access, seasonal rainfall, material delivery, and project requirements during planning.",
    },
    {
      icon: Icon3,
      title: "Transparent Reporting",
      text: "Clients receive clear updates on progress, variations, site risks, budget movement, and next steps.",
    },
  ];

  return (
    <main>
      <section className="listing-hero about-hero">
        <div className="container">
          <div className="section-header text-center">
            <span>About Us</span>
            <h2>Professional construction services for demanding building projects</h2>
            <p>
              Loeung Sakhak Construction supports residential, shop house,
              commercial, and renovation projects in Cambodia.
            </p>
          </div>
        </div>
      </section>

      <section className="about-story py-5">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="about-image-stack">
                <img src={AboutImg} alt="Phnom Penh skyline in Cambodia" />
                <div className="about-badge">
                  <strong>Cambodia</strong>
                  <span>Local project focus</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section-header">
                <span>Who We Are</span>
                <h2>Construction support grounded in local project needs</h2>
              </div>
              <p>
                Loeung Sakhak Construction works with property owners and
                businesses planning construction and renovation in Cambodia.
                Each project starts with understanding the site, scope, and
                priorities.
              </p>
              <p>
                Our planning considers access, drainage, material sourcing,
                weather exposure, budget, and a clear handover process.
              </p>
              <div className="about-actions">
                <Link to="/project" className="btn btn-primary large">View Projects</Link>
                <Link to="/contactus" className="btn btn-secondary large">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container">
          <div className="row g-3">
            {stats.map((stat) => (
              <div className="col-6 col-lg-3" key={stat.label}>
                <div className="about-stat">
                  <strong>
                    {stat.value}
                  </strong>
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-values py-5">
        <div className="container py-4">
          <div className="section-header text-center">
            <span>Our Values</span>
              <h2>Practical planning for Cambodian sites</h2>
            <p>
              We plan around the site and project scope, and keep communication
              clear from consultation through handover.
            </p>
          </div>
          <div className="row g-4 pt-4">
            {values.map((value) => (
              <div className="col-md-4" key={value.title}>
                <article className="about-value-card">
                  <img src={value.icon} alt="" />
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-process py-5">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <img src={TeamImg} alt="Central Market in Phnom Penh, Cambodia" />
            </div>
            <div className="col-lg-7">
              <div className="section-header">
                <span>Our Process</span>
                <h2>A clear path from first discussion to handover</h2>
              </div>
              <div className="process-list">
                <div>
                  <strong>01</strong>
                  <div>
                    <h3>Consultation</h3>
                    <p>We discuss the project, location, site access, owner priorities, budget range, and key constraints.</p>
                  </div>
                </div>
                <div>
                  <strong>02</strong>
                  <div>
                    <h3>Planning</h3>
                    <p>We review scope, quantities, material options, delivery timing, workforce needs, and schedule.</p>
                  </div>
                </div>
                <div>
                  <strong>03</strong>
                  <div>
                    <h3>Construction</h3>
                    <p>Our supervisors coordinate trades, materials, inspections, and daily site progress.</p>
                  </div>
                </div>
                <div>
                  <strong>04</strong>
                  <div>
                    <h3>Handover</h3>
                    <p>We complete punch-list checks, documentation, final cleaning, and client handover.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
