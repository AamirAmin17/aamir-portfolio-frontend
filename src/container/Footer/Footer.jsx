import React, { useState } from "react";
//External Imports

//Internal Imports
import "./Footer.scss";
import "./FooterMediaQuery.scss";
import { AppWrap, MotionWrap } from "../../wrapper";
import { images } from "../../constants";
import { motion } from "framer-motion";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(false);
  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);
    const strapiPost = async () => {
      if (name && email && message) {
        const contact = {
          data: {
            name,
            email,
            message,
          },
        };

        const data = await fetch("http://localhost:1337/api/contacts", {
          method: "POST",
          body: JSON.stringify(contact),
          headers: { "Content-Type": "application/json" },
        });
        setIsFormSubmitted(true);
      } else {
        setSubmitBtn(true);
      }
      setLoading(false);
    };
    strapiPost();
  };
  return (
    <>
      <h2 className='head-text'>Take a coffe & chat with me</h2>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt='email' />
          <a href='mailto:aamir1401a@gmail.com' className='p-text'>
            aamir1401a@gmail.com
          </a>
        </div>

        <div className='app__footer-card'>
          <img src={images.mobile} alt='mobile' />
          <a href='tel:+92-316-s2247794' className='p-text'>
            +92-316-2247794
          </a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className='app__footer-form app_flex'>
          <div className='app__flex'>
            <input
              className='p-text'
              type='text'
              placeholder='Your name*'
              name='name'
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          {submitBtn && !name ? (
            <motion.p
              className='p-text app__footer-error'
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}>
              This field is required
            </motion.p>
          ) : (
            ""
          )}
          <div className='app__flex'>
            <input
              className='p-text'
              type='email'
              placeholder='Your email*'
              name='email'
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          {submitBtn && !email ? (
            <motion.p
              className='p-text app__footer-error'
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}>
              This field is required
            </motion.p>
          ) : (
            ""
          )}
          <div>
            <textarea
              className='p-text'
              placeholder='Your Message*'
              value={message}
              name='message'
              onChange={handleChangeInput}
            />
          </div>
          {submitBtn && !message ? (
            <motion.p
              className='p-text app__footer-error'
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}>
              This field is required
            </motion.p>
          ) : (
            ""
          )}
          <div className='app__footer-btn'>
            <button type='button' className='p-text' onClick={handleSubmit}>
              {loading ? "Sending" : "Send Message"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className='head-text'>Thank you for getting In touch</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
