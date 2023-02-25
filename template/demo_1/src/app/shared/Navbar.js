import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Trans } from "react-i18next";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpired: false,
    };
  }
  componentDidMount() {
    this.checkuser();
  }

  checkuser() {
    let token = JSON.parse(localStorage.getItem("token"));
    // console.log("token", token);
    if (token === null) {
      this.setState({ isExpired: true });
    }

    //console.log(token);
    axios
      .get("http://localhost:5000/api/login/userinfo", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        if (error.response.data.msg)
          return toast.error(error.response.data.msg);

        toast.error(error.response.data.error);
        this.setState({ isExpired: true });
      });
  }
  toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }
  toggleRightSidebar() {
    document.querySelector(".right-sidebar").classList.toggle("open");
  }
  Logout() {
    localStorage.removeItem("token");
  }
  render() {
    return (
      <div>
        <Toaster />
        {this.state.isExpired === true && <Redirect to="/login" />}
        <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <Link className="brand-logo" to="/">
              <img
                src={require("../../assets/images/imagesslash.png")}
                alt="logo"
                height="50px"
              />{" "}
            </Link>
            <Link className="navbar-brand brand-logo-mini" to="/">
              <img
                src={require("../../assets/images/logo-mini.svg")}
                alt="logo"
              />
            </Link>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-stretch">
            <button
              className="navbar-toggler navbar-toggler align-self-center"
              type="button"
              onClick={() =>
                document.body.classList.toggle("sidebar-icon-only")
              }
            >
              <span className="mdi mdi-menu"></span>
            </button>
            <div className="search-field d-none d-md-block">
              <form className="d-flex align-items-center h-100" action="#">
                <div className="input-group">
                  <div className="input-group-prepend bg-transparent">
                    {/* <i className="input-group-text border-0 mdi mdi-magnify"></i> */}
                  </div>
                  {/* <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects"/> */}
                </div>
              </form>
            </div>
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item">
                <Dropdown alignRight>
                  <Dropdown.Toggle className="nav-link">
                    <div className="nav-profile-text">
                      <p className="mb-1 text-black">
                        <Trans>Runs</Trans>
                      </p>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="navbar-dropdown">
                    <Dropdown.Item
                      href="!#"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      {/* <i className="mdi mdi-cached mr-2 text-success"></i> */}{" "}
                      <i className="mr-3"></i>{" "}
                      <Trans>
                        {" "}
                        <Link to="/runs">Create</Link>
                      </Trans>
                    </Dropdown.Item>

                    <Dropdown.Item
                      href="!#"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <i className="mr-3"></i>
                      <Trans>
                        <Link to="/">View</Link>
                      </Trans>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>

              <li className="nav-item">
                <Dropdown alignRight>
                  <Dropdown.Toggle className="nav-link">
                    <div className="nav-profile-text">
                      <p className="mb-1 text-black">
                        <Trans>TestSets</Trans>
                      </p>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="navbar-dropdown">
                    <Dropdown.Item
                      href="!#"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      {/* <i className="mdi mdi-cached mr-2 text-success"></i> */}
                      <i className="mr-3"></i>
                      <Trans>
                        <Link to="/testset">Create</Link>
                      </Trans>
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="!#"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <i className="mr-3"></i>
                      <Trans>
                        {" "}
                        <Link to="/viewtestsets">View</Link>
                      </Trans>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="nav-item">
                <Dropdown alignRight>
                  <Dropdown.Toggle className="nav-link">
                    <div className="nav-profile-text">
                      <p className="mb-1 text-black">
                        <Trans>TestCases</Trans>
                      </p>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="navbar-dropdown">
                    <Dropdown.Item
                      href="!#"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      {/* <i className="mdi mdi-cached mr-2 text-success"></i> */}
                      <i className="mr-3"></i>
                      <Trans>
                        <Link to="/testcase">Create</Link>
                      </Trans>
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="!#"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <i className="mr-3"></i>
                      <Trans>
                        <Link to="/viewcases">View</Link>
                      </Trans>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>

              <li className="nav-item">
                <Dropdown alignRight>
                  <Dropdown.Toggle className="nav-link count-indicator">
                    <i className="mdi mdi-bell-outline"></i>
                    <span className="count-symbol bg-danger"></span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
                    <h6 className="p-3 mb-0">
                      <Trans>Notifications</Trans>
                    </h6>
                    <div className="dropdown-divider"></div>
                    <Dropdown.Item
                      className="dropdown-item preview-item"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-success">
                          <i className="mdi mdi-calendar"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">
                          <Trans>Event today</Trans>
                        </h6>
                        <p className="text-gray ellipsis mb-0">
                          <Trans>
                            Just a reminder that you have an event today
                          </Trans>
                        </p>
                      </div>
                    </Dropdown.Item>
                    <div className="dropdown-divider"></div>
                    <Dropdown.Item
                      className="dropdown-item preview-item"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-warning">
                          <i className="mdi mdi-settings"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">
                          <Trans>Settings</Trans>
                        </h6>
                        <p className="text-gray ellipsis mb-0">
                          <Trans>Update dashboard</Trans>
                        </p>
                      </div>
                    </Dropdown.Item>
                    <div className="dropdown-divider"></div>
                    <Dropdown.Item
                      className="dropdown-item preview-item"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-info">
                          <i className="mdi mdi-link-variant"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">
                          <Trans>Launch Admin</Trans>
                        </h6>
                        <p className="text-gray ellipsis mb-0">
                          <Trans>New admin wow</Trans>!
                        </p>
                      </div>
                    </Dropdown.Item>
                    <div className="dropdown-divider"></div>
                    <h6 className="p-3 mb-0 text-center cursor-pointer">
                      <Trans>See all notifications</Trans>
                    </h6>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li
                className="nav-item nav-logout d-none d-lg-block"
                onClick={this.Logout}
              >
                <Link className="nav-link" href="!#" to="login">
                  <i className="mdi mdi-power"></i>
                </Link>
              </li>
              <li className="nav-item nav-settings d-none d-lg-block">
                {/* <button
                type="button"
                className="nav-link border-0"
                onClick={this.toggleRightSidebar}
              >
                <i className="mdi mdi-format-line-spacing"></i>
              </button> */}
              </li>
            </ul>
            <button
              className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              onClick={this.toggleOffcanvas}
            >
              <span className="mdi mdi-menu"></span>
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
