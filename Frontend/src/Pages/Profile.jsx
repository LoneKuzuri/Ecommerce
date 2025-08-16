import './Profile.css';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function Profile() {
  return (
    <section className="profile-section">
      <h2 className="section-title">Store Information</h2>
      
      <div className="info-card">
        <h3 className="store-title">Subha OM Enterprises</h3>
        <div className="info-list">
          <p><strong>Proprietors:</strong> Sita Pandey & Yubraj Pangeni</p>
          <p><strong>Established:</strong> 2081, Baisakh 1</p>
          <p><strong>Address:</strong> Omsatiya-01, Rupandehi, Saraswati Tol</p>
          <p><strong>Landmark:</strong> Opposite Hotel Sunrise</p>
        </div>
      </div>

      <div className="info-card">
        <h3 className="store-title">Contact Information</h3>
        <div className="contact-list">
         
          <a href="tel:+9779857032030" className="contact-link phone">
            <span className="icon">
              <FontAwesomeIcon icon={faPhone} />
            </span>

            <div>
              <p className="contact-title">Call Us</p>
              <p className="contact-detail">+977 9857032030</p>
            </div>
          </a>

          <a href="https://wa.me/9779857032030" target="_blank" rel="noopener noreferrer" className="contact-link whatsapp">
            <span className="icon">
              <FontAwesomeIcon icon={faWhatsapp} />
            </span>
            <div>
              <p className="contact-title">WhatsApp</p>
              <p className="contact-detail">+977 9857032030</p>
            </div>
          </a>

          <a href="mailto:subhaom@gmail.com" className="contact-link email">
            <span className="icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <div>
              <p className="contact-title">Email</p>
              <p className="contact-detail">subhaom@gmail.com</p>
            </div>
          </a>
          
        </div>
      </div>
    </section>
  );
}

export default Profile;