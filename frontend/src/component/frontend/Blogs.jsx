import React, { useEffect, useState } from "react";
import BlogImage from "../../assets/image/cambodia-wat-phnom.jpg";
import { apiUrl, fileUrl } from "./request/Request";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(apiUrl + "get-blogs");
        const result = await res.json();
        setBlogs(result.data ?? []);
      } catch {
        setError("Unable to load blogs right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main>
      <section className="listing-hero blog-hero">
        <div className="container">
          <div className="section-header text-center">
            <span>Blogs</span>
            <h2>Construction advice for Cambodia</h2>
            <p>
              Local considerations for planning, building, and renovating in
              Cambodia's climate and cities.
            </p>
          </div>
        </div>
      </section>

      <section className="listing-section py-5">
        <div className="container py-4">
          {loading && <div className="listing-status">Loading blogs...</div>}
          {error && <div className="listing-status error">{error}</div>}
          {!loading && !error && blogs.length === 0 && (
            <div className="listing-status">No blogs found.</div>
          )}

          <div className="row g-4">
            {blogs.map((blog) => (
              <div className="col-md-6 col-xl-4 d-flex" key={blog.id}>
                <article className="listing-card blog-list-card w-100">
                  <div className="listing-image">
                    <img
                      src={blog.image ? `${fileUrl}Upload/blogs/large/${blog.image}` : BlogImage}
                      alt={blog.title}
                    />
                  </div>
                  <div className="listing-body">
                    <div>
                      <span className="listing-kicker">{blog.author || "Construction"}</span>
                      <h3>{blog.title}</h3>
                      <p>{blog.short_description || blog.content}</p>
                    </div>
                    {blog.created_at && (
                      <div className="listing-meta">
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                      </div>
                    )}
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

export default Blogs;
