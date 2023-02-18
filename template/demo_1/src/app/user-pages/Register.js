import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import validator from "validator";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
export class Register extends Component {
  constructor(props) {
    super(props);
    this.init = {
      name: "",
      email: "",
      password: "",
      accesslevel: "",
    };
    this.state = {
      submitted: false,
    };
  }

  validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is Required";
    }
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (true !== validator.isEmail(values.email)) {
      errors.email = "Enter Valid Email";
    }
    if (!values.password) {
      errors.password = "Password is Required";
    } else if (true === validator.isAlphanumeric(values.password)) {
      errors.password = "Enter Strong Password";
    }
    if (!values.accesslevel) {
      errors.accesslevel = " Accesslevel is Required";
    }
    return errors;
  };

  Postregister = async (values) => {
    //console.log(values);
    try {
      let result = await axios.post(
        "http://localhost:5000/api/register",
        values
      );
      console.log(result);
      toast.success(`User Registered With Email ${result.data.email}`);
    } catch (error) {
      // console.log(error.response.data);
      toast.error(error.response.data);
    }
  };
  handleSubmit = (values, setSubmitting) => {
    // this.props.setRegister(values);
    this.Postregister(values);
    setTimeout(() => {
      setSubmitting(false);
    }, 400);
    setTimeout(() => {
      this.setState({ submitted: true });
    }, 2000);

    // Object.keys(values).forEach((field) => {
    //   setFieldValue(field, "");
    // });
    // this.setState({
    //   name: values,
    // });
    // console.log("payload -", this.state);
  };
  render() {
    return (
      <div>
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
                <h4>New here?</h4>
                <h6 className="font-weight-light">
                  Signing up is easy. It only takes a few steps
                </h6>
                <Formik
                  initialValues={this.init}
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
                    <form className="pt-3" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Username"
                          id="username"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        <span>
                          {errors.name && touched.name && errors.name}
                        </span>
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Email"
                          id="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <span>
                          {errors.email && touched.email && errors.email}
                        </span>
                      </div>
                      <div className="form-group">
                        <select
                          className="form-control form-control-lg"
                          id="Accesslevel"
                          name="accesslevel"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.accesslevel}
                        >
                          <option>Accesslevel</option>
                          <option value="admin">Admin</option>
                          <option value="tester">Tester</option>
                        </select>
                        <span>
                          {errors.accesslevel &&
                            touched.accesslevel &&
                            errors.accesslevel}
                        </span>
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Password"
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
                      </div>
                      <div className="mb-4">
                        <div className="form-check">
                          <label className="form-check-label text-muted">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </label>
                        </div>
                      </div>
                      <div className="mt-3">
                        <button
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          type="submit"
                          value="Submit"
                          disabled={isSubmitting}
                        >
                          SIGN UP
                        </button>
                      </div>
                      <div className="text-center mt-4 font-weight-light">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary">
                          Login
                        </Link>
                      </div>
                    </form>
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

export default Register;
