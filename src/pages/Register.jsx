import { Form, Link, redirect } from "react-router";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const res = await customFetch.post("/auth/local/register", data);
    toast.success("Account created successfully");
    return redirect("/login");
  } catch (error) {
    const errMsg =
      error?.response?.data?.error?.message ||
      "Please double check your credentials";
    toast.error(errMsg);
    return null;
  }
};

const Register = () => {
  return (
    <section className="grid min-h-screen place-items-center bg-linear-to-br from-base-200 via-base-100 to-primary/10 px-4 py-12">
      <Form
        method="POST"
        className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100/90 p-8 shadow-2xl backdrop-blur"
      >
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-primary">
            join us
          </p>

          <h4 className="mt-3 text-4xl font-black tracking-tight">
            Create Account
          </h4>

          <p className="mt-3 text-sm text-base-content/60">
            Sign up to start shopping your favorite products.
          </p>
        </div>

        <div className="flex flex-col gap-y-5">
          <FormInput label="username" name="username" type="text" />
          <FormInput label="email" name="email" type="email" />
          <FormInput label="password" name="password" type="password" />
        </div>

        <div className="mt-8">
          <SubmitBtn text="Register" />
        </div>

        <div className="mt-8 space-y-4 text-center text-sm">
          <p className="text-base-content/70">
            Already a member?
            <Link
              to="/login"
              className="ml-2 font-bold text-primary transition duration-300 hover:text-primary/70"
            >
              Login
            </Link>
          </p>

          <Link
            to="/"
            className="inline-flex font-semibold text-base-content/60 transition duration-300 hover:text-primary"
          >
            Back to home page
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default Register;
