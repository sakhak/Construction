import React, { useState } from "react";
import { Card, Carousel, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Sakhak from "../../assets/image/Loeungsakhak.jpg";

const Rating = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Loeung SakHak",
      position: "CEO",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nobis suscipit adipisci incidunt inventore iusto fuga velit, non voluptatibus voluptate pariatur nemo facere sunt sapiente quos cumque expedita maxime at.",
      rating: 5,
      image: { Sakhak },
    },
    {
      name: "Jane Smith",
      position: "Marketing Director",
      content:
        "The service was exceptional from start to finish. The team went above and beyond to deliver exactly what we needed for our campaign. I would highly recommend them to anyone looking for quality work.",
      rating: 4,
      image: { Sakhak },
    },
    {
      name: "Robert Johnson",
      position: "Product Manager",
      content:
        "Working with this team has been a game-changer for our product. Their insights and expertise helped us refine our offering and reach a wider audience. The results have been outstanding.",
      rating: 5,
      image: {Sakhak},
    },
    {
      name: "Sarah Williams",
      position: "Creative Director",
      content:
        "I'm continually impressed by the creativity and attention to detail. They understand our brand vision and consistently deliver designs that exceed our expectations.",
      rating: 5,
      image: {Sakhak},
    },
  ];

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill={index < rating ? "#FFD700" : "#D3D3D3"}
        className="bi bi-star-fill me-1"
        viewBox="0 0 16 16"
      >
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
    ));
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">Customer Testimonials</h2>

      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        indicators={false}
        interval={null}
        className="testimonial-carousel"
        variant="dark"
      >
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index}>
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8">
                <Card className="shadow border-0 h-100">
                  <Card.Body className="p-4 p-md-5">
                    <div className="rating mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    <div className="content pb-3">
                      <p className="card-text">{testimonial.content}</p>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center">
                      <div className="profile-image me-3">
                        <img
                          src={Sakhak}
                          alt={testimonial.name}
                          width={50}
                          height={50}
                          className="rounded-circle"
                        />
                      </div>
                      <div>
                        <div className="name fw-bold">{testimonial.name}</div>
                        <div className="position text-muted">
                          {testimonial.position}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="d-flex justify-content-center mt-4">
        <Pagination className="custom-pagination">
          {testimonials.map((_, index) => (
            <Pagination.Item
              key={index}
              active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      <style>{`
        .testimonial-carousel .carousel-control-prev,
        .testimonial-carousel .carousel-control-next {
          width: 5%;
          opacity: 0.8;
        }
        .testimonial-carousel .carousel-control-prev-icon,
        .testimonial-carousel .carousel-control-next-icon {
          background-color: rgba(0,0,0,0.5);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          background-size: 60%;
        }
        .custom-pagination .page-link {
          border: none;
          color: #6c757d;
          margin: 0 5px;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .custom-pagination .page-item.active .page-link {
          background-color: #6c757d;
          border-color: #6c757d;
        }
        .card {
          transition: transform 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        @media (max-width: 768px) {
          .testimonial-carousel .carousel-control-prev,
          .testimonial-carousel .carousel-control-next {
            display: none;
          }
          .custom-pagination .page-link {
            width: 30px;
            height: 30px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Rating;
