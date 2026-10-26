import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <footer>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3">
              <h3>Loeung Sakhak Construction</h3>
              <div className="pe-5">
                <p>
                Construction, renovation, and project coordination for homes,
                businesses, and commercial projects in Cambodia.
              </p>
              </div>
            </div>
            <div className="col-md-3">
              <h3>Our Services</h3>
              <ul>
                <li>
                  <Link to="/service">Specialty Construction</Link>
                </li>
                <li>
                  <Link to="/service">Civil Construction</Link>
                </li>
                <li>
                  <Link to="/service">Residential Construction</Link>
                </li>
                <li>
                  <Link to="/service">Corporate Construction</Link>
                </li>
                <li>
                  <Link to="/service">Building Constructions</Link>
                </li>
                <li>
                  <Link to="/service">Industrial Construction</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/service">Services</Link>
                </li>
                <li>
                  <Link to="/project">Projects</Link>
                </li>
                <li>
                  <Link to="/blogs">Blog</Link>
                </li>
                <li>
                  <Link to="/contactus">Contact us</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Contact Us</h3>
              <ul>
                <li>
                  <a href="tel:+85516607238">(+855) 166 07 238</a>
                </li>
                <li>
                  <a href="mailto:loeungsakhak438@gmail.com">loeungsakhak438@gmail.com</a>
                </li>
              </ul>
            </div>
            <hr />
            <div className="text-center pt-4">Loeung Sakhak Construction - Cambodia</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
