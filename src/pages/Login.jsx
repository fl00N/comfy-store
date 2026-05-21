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
    <section className="grid min-h-screen place-items-center bg-linear-to-br from-base-200 via-base-100 to-secondary/10 px-4 py-12">
      <Form
        method="POST"
        className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100/90 p-8 shadow-2xl backdrop-blur"
      >
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-secondary">
            welcome back
          </p>

          <h4 className="mt-3 text-4xl font-black tracking-tight">Login</h4>

          <p className="mt-3 text-sm text-base-content/60">
            Sign in to continue shopping and manage your orders.
          </p>
        </div>

        <div className="flex flex-col gap-y-5">
          <FormInput label="email" name="identifier" type="email" />
          <FormInput label="password" name="password" type="password" />
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <SubmitBtn text="Login" />

          <button
            type="button"
            className="btn btn-secondary btn-block rounded-full font-bold uppercase tracking-wide shadow-lg transition duration-300 hover:scale-105"
            onClick={loginAsGuestUser}
          >
            Continue as Guest
          </button>
        </div>

        <div className="mt-8 space-y-4 text-center text-sm">
          <p className="text-base-content/70">
            Not a member yet?
            <Link
              to="/register"
              className="ml-2 font-bold text-secondary transition duration-300 hover:text-secondary/70"
            >
              Register
            </Link>
          </p>

          <Link
            to="/"
            className="inline-flex font-semibold text-base-content/60 transition duration-300 hover:text-secondary"
          >
            Back to home page
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default Login;
