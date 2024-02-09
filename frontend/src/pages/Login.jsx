import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const HOST_URL = "http://localhost:8000/api";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${HOST_URL}/auth/login`, values);
      // Assuming your server returns a token upon successful login
      const token = response.data.token;
      console.log("🚀 ~ Login ~ token:", token);
      // Store token in localStorage or context for future authenticated requests
      localStorage.setItem("token", JSON.stringify(token));
      // Redirect user to dashboard or desired route upon successful login
      navigate("/");
      toast.success("Login successful.");
    } catch (error) {
      // Handle error
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
              <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                  Sign in
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-black transition-all duration-200 hover:underline"
                  >
                    Create a free account
                  </Link>
                </p>
                <div className="mt-8 space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-semibold text-black hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      {isSubmitting ? "Signing in..." : "Sign in"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Login;
