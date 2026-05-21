import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { Link } from "react-router";
import { toggleTheme } from "../features/user/userSlice";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLinks } from "./";

const Navbar = () => {
  const amount = useSelector((state) => state.cartState.numItemsInCart);
  const { user, theme } = useSelector((state) => state.userState);
  const isDarkTheme = theme === "dracula";

  const dispatch = useDispatch();
  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-base-300 bg-base-100/80 shadow-sm backdrop-blur-xl">
      <div className="navbar align-element min-h-20">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary btn-square text-3xl font-black shadow-lg transition duration-300 hover:scale-105"
          >
            C
          </NavLink>

          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 z-10 w-56 rounded-2xl bg-base-100 p-3 shadow-2xl ring-1 ring-base-300"
            >
              <NavLinks />
            </ul>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 rounded-full bg-base-200/70 px-3 py-2 shadow-inner">
            <li>
              <Link
                to="/"
                className="rounded-full px-5 font-semibold transition duration-300 hover:bg-primary hover:text-primary-content"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="rounded-full px-5 font-semibold transition duration-300 hover:bg-primary hover:text-primary-content"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="rounded-full px-5 font-semibold transition duration-300 hover:bg-primary hover:text-primary-content"
              >
                Products
              </Link>
            </li>

            {user && (
              <li>
                <Link
                  to="/orders"
                  className="rounded-full px-5 font-semibold transition duration-300 hover:bg-primary hover:text-primary-content"
                >
                  Orders
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-end gap-3">
          <label className="swap swap-rotate rounded-full bg-base-200 p-3 shadow-sm transition duration-300 hover:bg-base-300 hover:scale-105">
            <input
              type="checkbox"
              checked={isDarkTheme}
              className="theme-controller"
              onChange={handleTheme}
            />

            <svg
              className="swap-off h-6 w-6 fill-current text-warning"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-on h-6 w-6 fill-current text-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          <NavLink
            className="p-3 w-12 h-12 btn btn-ghost btn-circle relative bg-base-200 shadow-sm transition duration-300 hover:scale-105 hover:bg-base-300"
            to="cart"
          >
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-primary badge-sm indicator-item border-0 font-bold shadow">
                {amount}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
