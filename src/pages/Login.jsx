import { Form, Link, redirect, useNavigate } from "react-router";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const res = await customFetch.post("/auth/local", data);

      store.dispatch(loginUser(res.data));
      toast.success("Logged in successfully");
      return redirect("/");
    } catch (error) {
      console.error(error);
      const errMsg =
        error?.response?.data?.error?.message ||
        "Please double check your credentials";
      toast.error(errMsg);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const res = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });

      dispatch(loginUser(res.data));
      toast.success("Welcome, Guest User!");
      return navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Guest user login error. Please try later.");

      return null;
    }
  };
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>

        <FormInput label="email" name="identifier" type="email" />
        <FormInput label="password" name="password" type="password" />
        <div className="mt-4">
          <SubmitBtn text={"Login"} />
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          Guest user
        </button>

        <p className="text-center">
          Not a member yet?
          <Link to="/register" className="ml-2 link link-hover link-primary">
            Register
          </Link>
        </p>
        <p className="text-center">
          <Link to="/" className="ml-2 link link-hover ">
            Back to home page
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
