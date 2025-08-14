import React, { useEffect, useState } from "react";
import Navbar from "../component/NavBar";
import Header from "../component/Header";
import BlogList from "../component/BlogList";
import Newsletter from "../component/Newsletter";
import Footer from "../component/Footer";
import { useAppContext } from "../context/AppContext";
import ShimmerUI from "../component/ShimmerUI_BlogList";

const Home = () => {
  const { blogs } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setLoading(false);
    }
  }, [blogs]);

  return (
    <div>
      <Navbar />
      <Header />
      {loading ? <ShimmerUI /> : <BlogList />}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
