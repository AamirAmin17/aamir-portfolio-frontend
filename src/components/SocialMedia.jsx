import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
        <BsInstagram />
      </div>
      <div>
        <FaFacebook />
      </div>
      <div>
        <FaLinkedin />
      </div>
    </div>
  );
};

export default SocialMedia;
