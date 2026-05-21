import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import { clearCart } from "../features/cart/cartSlice";
import { QueryClient } from "@tanstack/react-query";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const queryClient = new QueryClient();

  const handleLogout = () => {
    navigate("/");
    queryClient.removeQueries();
    dispatch(clearCart());
    dispatch(logoutUser());
  };

  return (
    <header className="bg-base py-2 text-base-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <button
              className="btn btn-xs btn-outline btn-primary uppercase"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="register" className="link link-hover text-xs sm:text-sm">
              Create an Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
