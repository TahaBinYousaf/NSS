import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Image1 from "../assets/logo1.png";
import Image2 from "../assets/logo2.png";
import Image3 from "../assets/logo3.png";
import Image4 from "../assets/logo4.png";
import Image5 from "../assets/logo5.png";
import Image6 from "../assets/logo6.png";
import Image7 from "../assets/logo7.png";

const links = [
  { name: "Items for sale", to: "/collection", imageSrc: Image7 },
  { name: "Items to share", to: "/collection", imageSrc: Image4 },
  { name: "Items for rent", to: "/collection", imageSrc: Image1 },
  { name: "Item request", to: "/collection", imageSrc: Image2 },
  { name: "Resources", to: "/collection", imageSrc: Image6 },
  { name: "Events", to: "/collection", imageSrc: Image3 },
  { name: "Services", to: "/collection", imageSrc: Image5 },
];

const Categories = ({ header = "", customLinkClick = false, categorySet, adProps }) => {
  return (
    <>
      <h1 data-aos="fade-right" className="text-3xl px-7 mt-10 font-semibold text-center sm:text-left uppercase">
        {header}
      </h1>
      <div className="flex flex-wrap justify-center gap-4 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:gap-12 md:px-8 md:py-12 lg:gap-16 lg:px-10 lg:py-14 xl:gap-20 xl:px-12 xl:py-16">
        {links.map((link, index) => {
          return <Link key={index} {...link} {...adProps?.[link.name]} customLinkClick={customLinkClick} categorySet={categorySet} />;
        })}
      </div>
    </>
  );
};

export default Categories;

function Link({ to, imageSrc, name, customLinkClick = false, categorySet, ...rest }) {
  const navigate = useNavigate();
  function onClick(e) {
    e.preventDefault();
    customLinkClick ? categorySet({ imageSrc, name, ...rest }) : navigate(`${to}/${name}`);
  }

  return (
    <div className="flex flex-col items-center" style={{ cursor: "pointer" }}>
      <NavLink onClick={onClick}>
        <img src={imageSrc} className="w-30 h-30 rounded-full border-2 border-gray-300 object-cover" />
      </NavLink>
      <p className="mt-2 text-gray-700 text-2xl font-bold">{name}</p>
    </div>
  );
}
