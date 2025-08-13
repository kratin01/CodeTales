//Client/Src/Component/Footer.jsx

import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={assets.logo2}
              alt="logo"
              className="w-12 sm:w-12 object-contain"
            />
            <span className="text-xl sm:text-3xl font-semibold text-primary">
              CodeTales
            </span>
          </div>
          <p className="max-w-[410px] mt-6">
            CodeTales is your go-to platform for sharing stories, insights, and
            ideas. Discover engaging content, connect with passionate writers,
            and join a vibrant blogging community.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-primary md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright 2025 © CodeTales - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
