import React, { useState, useEffect } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";
import ShimmerUI from "./ShimmerUI_BlogCards";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [loading, setLoading] = useState(true);

  const { blogs, input } = useAppContext();

  useEffect(() => {
    // Simulate a 3-second delay
    const timer = setTimeout(() => {
      if (blogs) {
        setLoading(false);
      }
    }, 1000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [blogs]);

  const filteredBlogs = () => {
    if (input === "") return blogs;
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  if (loading) {
    return <ShimmerUI />;
  }

  return (
    <div>
      {/* Categories */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : menu === blog.category))
          .map((item) => (
            <BlogCard key={item._id} blog={item} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;