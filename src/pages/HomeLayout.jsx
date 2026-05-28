import { Outlet, useLocation, useNavigation } from "react-router";
import { Navbar, Header, Loading } from "../components";

const HomeLayout = () => {
  const navigation = useNavigation();
  const location = useLocation();

  const isPageLoading =
    location.pathname !== "/products" && navigation.state === "loading";

  return (
    <>
      <Header />
      <Navbar />

      {isPageLoading ? (
        <Loading />
      ) : (
        <>
          <section className="align-element py-20">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default HomeLayout;
