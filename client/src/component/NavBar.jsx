// client/src/component/NavBar.jsx
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      {/* Logo + Name */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img
          src={assets.logo2}
          alt="logo"
          className="w-12 sm:w-12 object-contain"
        />
        <span className="text-xl sm:text-3xl font-semibold text-primary">CodeTales</span>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full text-sm sm:text-base cursor-pointer bg-primary text-white px-8 py-2.5"
      >
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} alt="arrow" className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;
