import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
export class Login extends Component {
  constructor(props) {
    super(props);

    this.initialValues = { email: "", password: "" };
    this.state = {
      user: null,
      isLoggedIn: false,
    };
  }
  componentDidMount() {
    localStorage.removeItem("token");
  }
  postlogin = async (values) => {
    // console.log(values);
    try {
      let result = await axios.post("http://localhost:5000/api/login", values);
      // console.log("Result->", result);
      // console.log("Result->", result.data);

      if (result.data.token) {
        localStorage.setItem("token", JSON.stringify(result.data.token));
      }

      if (result.status === 200) {
        this.setState({
          user: result.data.user,
          isLoggedIn: true,
        });
        //console.log(result.data.msg);
        // toast(result.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };
  handleSubmit = (values, setSubmitting) => {
    this.postlogin(values);
    setTimeout(() => {
      setSubmitting(false);
    }, 400);
  };
  render() {
    return (
      <div>
        {this.state.user && (
          <Redirect to="/home" replace={this.state.isLoggedIn} />
        )}
        <Toaster />
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img
                    src={require("../../assets/images/logo.svg")}
                    alt="logo"
                  />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Formik
                  initialValues={this.initialValues}
                  validate={(values) => this.validate(values)}
                  onSubmit={(values, { setSubmitting }) =>
                    this.handleSubmit(values, setSubmitting)
                  }
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <Form className="pt-3" onSubmit={handleSubmit}>
                      <Form.Group className="d-flex search-field">
                        <Form.Control
                          type="email"
                          placeholder="Username"
                          size="lg"
                          className="h-auto"
                          id="name"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />{" "}
                        <span>
                          {errors.email && touched.email && errors.email}
                        </span>
                      </Form.Group>

                      <Form.Group className="d-flex search-field">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          size="lg"
                          className="h-auto"
                          id="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        <span>
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </span>
                      </Form.Group>

                      <div className="mt-3">
                        <button
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          to="/dashboard"
                          type="submit"
                          value="Submit"
                          disabled={isSubmitting}
                        >
                          Log In
                        </button>
                      </div>
                      <div className="my-2 d-flex justify-content-between align-items-center">
                        <div className="form-check">
                          <label className="form-check-label text-muted">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </label>
                        </div>
                        <Link
                          to="/forgotpassword"
                          className="auth-link text-black"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="mb-2">
                        <button
                          type="button"
                          className="btn btn-block btn-facebook auth-form-btn"
                        >
                          <i className="mdi mdi-facebook mr-2"></i>Connect using
                          facebook
                        </button>
                      </div>
                      <div className="text-center mt-4 font-weight-light">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary">
                          Create
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
