import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { apiUrl, token } from "../request/Request";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(apiUrl + "admin", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token()}`,
          },
        });
        const result = await res.json();

        if (!res.ok || result.status === false) {
          throw new Error(result.message || "Unable to load dashboard data.");
        }

        setDashboard(result);
      } catch (err) {
        setError(err.message || "Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const summary = dashboard?.summary ?? {};
  const recent = dashboard?.recent ?? {};

  const cards = [
    {
      label: "Services",
      value: summary.services ?? 0,
      detail: `${summary.active_services ?? 0} active`,
      to: "/admin/services",
    },
    {
      label: "Projects",
      value: summary.projects ?? 0,
      detail: `${summary.active_projects ?? 0} active`,
      to: "/admin/projects",
    },
    {
      label: "Articles",
      value: summary.blogs ?? 0,
      detail: `${summary.active_blogs ?? 0} active`,
      to: "/admin/articles",
    },
  ];

  return (
    <>
      <main className="bg-brand-soft py-6">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="rounded-lg bg-white/70 p-4 shadow-sm md:p-6">
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <span className="text-sm font-semibold uppercase text-brand-pink">Admin</span>
                    <h2 className="mt-1 text-3xl font-semibold text-brand-dark">Dashboard</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/admin/services/create" className="rounded bg-brand-pink px-4 py-2 text-sm font-semibold uppercase text-white transition hover:bg-brand-yellow hover:text-brand-dark">New Service</Link>
                    <Link to="/admin/projects/create" className="rounded bg-brand-yellow px-4 py-2 text-sm font-semibold uppercase text-brand-dark transition hover:bg-brand-pink hover:text-white">New Project</Link>
                  </div>
                </div>

                {loading && <div className="rounded-lg border bg-white p-4 text-center text-gray-600">Loading dashboard...</div>}
                {error && <div className="rounded-lg border border-brand-pink/30 bg-white p-4 text-center text-brand-pink">{error}</div>}

                {!loading && !error && (
                  <>
                    <div className="row g-3">
                      {cards.map((card) => (
                        <div className="col-md-4" key={card.label}>
                          <Link to={card.to} className="block min-h-36 rounded-lg border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            <span className="text-sm font-semibold uppercase text-gray-600">{card.label}</span>
                            <strong className="mt-3 block text-4xl font-semibold leading-none text-brand-dark">{card.value}</strong>
                            <small className="mt-2 block font-semibold text-brand-pink">{card.detail}</small>
                          </Link>
                        </div>
                      ))}
                    </div>

                    <div className="row g-4 mt-1">
                      <div className="col-lg-6">
                        <RecentPanel
                          title="Recent Services"
                          items={recent.services ?? []}
                          field="name"
                          to="/admin/services"
                        />
                      </div>
                      <div className="col-lg-6">
                        <RecentPanel
                          title="Recent Projects"
                          items={recent.projects ?? []}
                          field="name"
                          to="/admin/projects"
                        />
                      </div>
                      <div className="col-12">
                        <RecentPanel
                          title="Recent Articles"
                          items={recent.blogs ?? []}
                          field="title"
                          to="/admin/articles"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const RecentPanel = ({ title, items, field, to }) => {
  return (
    <div className="h-full rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between border-b border-black/10 pb-3">
        <h3 className="m-0 text-lg font-semibold text-brand-dark">{title}</h3>
        <Link to={to} className="font-semibold text-brand-pink">Manage</Link>
      </div>
      <div className="flex flex-col">
        {items.length === 0 && <div className="py-3 text-gray-500">No records yet.</div>}
        {items.map((item) => (
          <div className="flex items-center justify-between gap-4 border-b border-black/10 py-3 last:border-0" key={item.id}>
            <div className="min-w-0">
              <strong className="block truncate text-brand-dark">{item[field]}</strong>
              <span className="block truncate text-sm text-gray-500">{item.status == 1 ? "Active" : "Inactive"}</span>
            </div>
            <small className="shrink-0 text-sm text-gray-500">
              {item.created_at
                ? new Date(item.created_at).toLocaleDateString()
                : "No date"}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
