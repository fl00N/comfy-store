import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from "./pages";
import ErrorElement from "./components/ErrorElement";
import { loader as landingLoader } from "./pages/Landing";
import { loader as productsLoader } from "./pages/Products";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as ordersLoader } from "./pages/Orders";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as checkoutAction } from "./components/CheckoutForm";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader(queryClient),
        errorElement: <ErrorElement />,
      },
      {
        path: "products",
        element: <Products />,
        loader: productsLoader(queryClient),
        errorElement: <ErrorElement />,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        loader: singleProductLoader(queryClient),
        errorElement: <ErrorElement />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: "orders",
        element: <Orders />,
        loader: ordersLoader(store, queryClient),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);

function App() {
  const theme = useSelector((state) => state.userState.theme);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          theme={theme}
          limit={3}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
