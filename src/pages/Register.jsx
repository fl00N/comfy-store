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
    <section className="h-screen grid place-items-center">
      <Form
        action={action}
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>

        <FormInput label="username" name="username" type="text" />
        <FormInput label="email" name="email" type="email" />
        <FormInput label="password" name="password" type="password" />

        <div className="mt-4">
          <SubmitBtn text={"Register"} />
        </div>

        <p className="text-center">
          Alredy a member?
          <Link to="/login" className="ml-2 link link-hover link-primary">
            Login
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

export default Register;
