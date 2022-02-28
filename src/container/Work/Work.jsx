import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Work.scss";
import "./WorkMediaQuery.scss";
import useFetchStrapi from "../../components/customHooks/useFetchStrapi";
const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [filterWork, setFilterWork] = useState([]);

  const { data: work } = useFetchStrapi(
    "http://localhost:1337/api/works?populate=imgUrl",
    setFilterWork
  );

  const baseUrl = "http://localhost:1337";
  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      if (item === "All") return setFilterWork(work);
      return setFilterWork(
        work.filter((work) => work.attributes.tags.includes(item))
      );
    }, 500);
  };
  return (
    <div className="app__works">
      <h2 className="head-text">
        My Creative <span>Portfolio </span>
        section
      </h2>
      <div className="app__work-filter">
        {["UI/UX", "Web App", "Next Js", "React Js", "All"].map(
          (item, index) => (
            <div
              key={`work ${item}`}
              onClick={() => handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text ${
                activeFilter === item ? "item-active" : ""
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={`work-inner ${index}`}>
            <div className="app__work-img app__flex">
              <img
                src={`${baseUrl}${work.attributes.imgUrl.data.attributes.url}`}
                alt={work.attributes.name}
              />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a
                  href={work.attributes.projectLink}
                  target="_blank"
                  rel="noreferrer nofollow"
                >
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                {work.attributes.codeLink && (
                  <a
                    href={work.attributes.codeLink}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                )}
              </motion.div>
            </div>
            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.attributes.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {work.attributes.description}
              </p>
              <div className="app__work-tag app__flex">
                <p className="p-text">{work.attributes.tags}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
