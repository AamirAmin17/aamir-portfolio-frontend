import React, { useState, useEffect } from "react";
import "./Skills.scss";
import "./SkillsMediaQuery.scss";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import ReactTooltip from "react-tooltip";
import useFetchStrapi from "../../components/customHooks/useFetchStrapi";
const Skills = () => {
  const [workExperience, setWorkExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  const { data: skillsData } = useFetchStrapi(
    "http://localhost:1337/api/skills?populate=icon",
    setSkills
  );

  const { data: experienceData } = useFetchStrapi(
    "http://localhost:1337/api/work-experiences",
    setWorkExperience
  );
  const baseUrl = "http://localhost:1337";
  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={`Skills-${skill.attributes.name}`}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.attributes.bgColor }}
              >
                <img
                  src={`${baseUrl}${skill.attributes.icon.data.attributes.url}`}
                  alt={skill.attributes.name}
                />
              </div>
              <p className="p-text">{skill.attributes.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="app__skills-exp-works">
          {workExperience.map((work, index) => (
            <React.Fragment key={`Item-${index}`}>
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className="app__skills-exp-work"
                data-tip
                data-for={work.attributes.company}
                key={`Skills-${work.attributes.name}`}
              >
                <h4 className="bold-text">{work.attributes.name}</h4>
                <p className="p-text">{work.attributes.company}</p>
              </motion.div>
              <ReactTooltip
                id={work.attributes.company}
                effect="solid"
                arrowColor="#fff"
                className="skills-tooltip"
              >
                {new Date(work.attributes.year).toDateString()}
              </ReactTooltip>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
