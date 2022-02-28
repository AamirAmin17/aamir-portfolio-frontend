import React, { useState } from "react";
//External Imports
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
//Internal Imports
import "./Testimonial.scss";
import "./TestimonialMediaQuery.scss";
import { AppWrap, MotionWrap } from "../../wrapper";
import useFetchStrapi from "../../components/customHooks/useFetchStrapi";

const Testimonial = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useFetchStrapi(
    "http://localhost:1337/api/testimonials?populate=imgUrl",
    setTestimonials
  );

  const handleClickLeft = (index) => {
    if (index === 0) return;
    if (currentIndex > 0) return setCurrentIndex(index - 1);
  };
  const handleClickRight = (index) => {
    if (index === testimonials.length - 1) return;
    if (currentIndex >= 0) return setCurrentIndex(index + 1);
  };
  const baseUrl = "http://localhost:1337";
  return (
    <>
      {testimonials.length && (
        <>
          <div className='app__testimonial-item app__flex'>
            <img
              src={`${baseUrl}${testimonials[currentIndex].attributes.imgUrl.data.attributes.url}`}
              alt={testimonials[0].attributes.name}
            />
            <div className='app__testimonial-content'>
              <p className='p-text'>
                {testimonials[currentIndex].attributes.feedBack}
              </p>
              <div>
                <h4 className='bold-text'>
                  {testimonials[currentIndex].attributes.name}
                </h4>
                <h4 className='p-text'>
                  {testimonials[currentIndex].attributes.company}
                </h4>
              </div>
            </div>
          </div>

          <div className='app__testimonial-btns app__flex'>
            <div
              className='app__flex'
              onClick={() => handleClickLeft(currentIndex)}>
              <HiChevronLeft />
            </div>
            <div
              className='app__flex'
              onClick={() => handleClickRight(currentIndex)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      {/* If worked for any brands so this code ... <div className="app__testimonials-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brands.attributes._id}
          >
            <img
              src={`${baseUrl}${brand.attributes.imgUrl.data.attributes.url}`}
              alt={brand.attributes.name}
            />
          </motion.div>
        ))}
      </div> */}
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__primarybg"
);
