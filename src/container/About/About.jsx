import React, { useEffect, useState } from "react";
import "./About.scss";
import "./About-MediaQuery.scss";
import { motion } from "framer-motion";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import useFetchStrapi from "../../components/customHooks/useFetchStrapi";
const About = () => {
  const { data: abouts } = useFetchStrapi(
    "http://localhost:1337/api/abouts?populate=imgUrl"
  );

  // const [abouts, setAbouts] = useState([]);

  // useEffect(() => {
  //   const fetchAbout = async () => {
  //     const getAbout = await fetch(
  //       "http://localhost:1337/api/abouts?populate=imgUrl"
  //     );
  //     const { data } = await getAbout.json();

  //     setAbouts(data);
  //   };
  //   fetchAbout();
  // }, []);

  const baseUrl = "http://localhost:1337";
  return (
    <section className="app__section-about">
      <h2 className="head-text">
        I know That <span>Good Apps </span>
        <br />
        means
        <span> Good Business</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => {
          return (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__profile-item"
              key={about.attributes.title + index}
            >
              <img
                src={`${baseUrl}${about.attributes.imgUrl.data.attributes.url}`}
                alt={about.title}
              />
              <h2 className="bold-text" style={{ marginTop: 20 }}>
                {about.attributes.title}
              </h2>
              <p className="p-text" style={{ marginTop: 10 }}>
                {about.attributes.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AppWrap(MotionWrap(About), "about", "app__whitebg");
