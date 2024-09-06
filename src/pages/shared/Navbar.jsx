import { useEffect, useState } from "react";
import { FaXmark, FaBarsStaggered, FaBars } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { LuBookOpen } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import Search from "../Search/Search";

const categories = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Programming",
  "Science fiction",
  "Fantasy",
  "Horror",
  "Biography",
  "Autobiography",
  "History",
  "Self-help",
  "Business",
  
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategoryClick = (categoryPath) => {
    setIsCategoryOpen(false);
    navigate(categoryPath);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "/" },
    { link: "Shop", path: "/shop" },
    { link: "Sell Your Book", path: "/admin/dashboard" },
    // 
    { link: "Cart", path: "/cart" },
    { link: "Admin", path: "/main-admin" },
    { link: <IoSearchSharp className="text-3xl" />, path: "/search" },
    { link: "Category", path: "#" } // Category nav item
  ];

  return (
    <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
      <nav className={`py-6 lg:px-24 px-12 sticky top-0 left-0 right-0 bg-white ${isSticky ? 'shadow-lg' : ''}`}>
        <div className="flex justify-between items-center text-base gap-12">
          <Link to="/" className="text-xl font-bold text-black flex items-center gap-8">
            <LuBookOpen className="inline-block" />
            Astha Prokashon
          </Link>

          <ul className="md:flex space-x-12 hidden navitems">
            {navItems.map(({ link, path }) => (
              <li key={link} className="relative">
                <Link
                  to={path}
                  className="link block text-base font-bold cursor-pointer uppercase text-black hover:text-blue-700"
                  onClick={link === "Category" ? (e) => { e.preventDefault(); toggleCategory(); } : undefined}
                >
                  {link}
                </Link>
                {link === "Category" && isCategoryOpen && (
                  <ul className="absolute left-0 mt-2 w-48 h-64 bg-white shadow-lg rounded-lg py-2 overflow-y-auto">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleCategoryClick(`/category/${category.toLowerCase().replace(/\s+/g, '-')}`);
                          }}
                          className="block px-4 py-2 text-gray-800 hover:bg-blue-700 hover:text-white"
                        >
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* <div className="space-x-12 hidden lg:flex items-center">
            <button>
              <FaBarsStaggered className="w-5 hover:text-blue-700" />
            </button>
          </div> */}

          {/* Menu button, visible on mobile screen */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              {isMenuOpen ? <FaXmark className="h-6 w-6 text-black" /> : <FaBarsStaggered className="h-5 w-5 text-black" />}
            </button>
          </div>
        </div>

        <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
          {navItems.map(({ link, path }) => (
            <a
              href={path}
              key={link}
              onClick={link === "Category" ? (e) => { e.preventDefault(); toggleCategory(); } : toggleMenu}
              className="block text-white hover:text-gray-500"
            >
              {link}
            </a>
          ))}
          {isCategoryOpen && (
            <ul className="space-y-2 h-64 overflow-y-auto">
              {categories.map((category, index) => (
                <li key={index}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(`/category/${category.toLowerCase().replace(/\s+/g, '-')}`);
                    }}
                    className="block text-white hover:text-gray-500"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
