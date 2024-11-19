import React from 'react'
import Image from 'next/image'
import Streetverse from '../src/assets/Streetverse.png'
import { GrInstagram, GrGithub, GrLinkedinOption } from 'react-icons/gr'

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="logo">
          <Image src={Streetverse} width={220} height={75} alt="logo" />
          <p>
            Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made.
          </p>
          <div className="icon-container">
            <a href="https://github.com/Amandeep-Singh-Khalsa" target="_blank" rel="noopener noreferrer">
              <GrGithub size={20} />
            </a>
            <a href="https://www.instagram.com/__amandeep.singh_/" target="_blank" rel="noopener noreferrer">
              <GrInstagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/amandeep-singh-khalsa/" target="_blank" rel="noopener noreferrer">
              <GrLinkedinOption size={20} />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Company</h3>
          <ul>
            <li>About</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>How it Works</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Support</h3>
          <ul>
            <li>Support Career</li>
            <li>24h Service</li>
            <li>Quick Chat</li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Contact</h3>
          <ul>
            <li>Whatsapp</li>
            <li>Support 24h</li>
          </ul>
        </div>
      </div>

      <div className="copyright">
        <p>Design by. <span>Weird Design Studio</span></p>
        <p>Code by. <span><a href="https://github.com/Amandeep-Singh-Khalsa" target="_blank" rel="noopener noreferrer">Amandeep-Singh-Khalsa</a></span></p>
      </div>
    </footer>
  )
}

export default Footer
