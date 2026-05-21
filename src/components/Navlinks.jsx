import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const Navlinks = () => {
  const user = useSelector((state) => state.userState.user);
  const links = [
    { id: 1, url: "/", text: "home" },
    { id: 2, url: "about", text: "about" },
    { id: 3, url: "products", text: "products" },
    { id: 4, url: "cart", text: "cart" },
    { id: 5, url: "orders", text: "orders" },
  ];

  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        if (url === "orders" && !user) return;

        return (
          <li key={id}>
            <NavLink to={url} className="capitalize">
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default Navlinks;
