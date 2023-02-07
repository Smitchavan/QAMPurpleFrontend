import React, { Component } from "react";
import { Form } from "react-bootstrap";
export default class ProjectPage extends Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Forms
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Form elements
              </li>
            </ol>
          </nav>
        </div>{" "}
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Project Form</h4>
                <p className="card-description"> Set Project Info </p>
                <form className="forms-sample">
                  <Form.Group className="row">
                    <label
                      htmlFor="exampleInputUsername2"
                      className="col-sm-3 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputUsername2"
                        placeholder="Username"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="col-sm-3 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="email"
                        className="form-control"
                        id="exampleInputEmail2"
                        placeholder="Email"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label
                      htmlFor="exampleInputMobile"
                      className="col-sm-3 col-form-label"
                    >
                      Mobile
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputMobile"
                        placeholder="Mobile number"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label
                      htmlFor="exampleInputPassword2"
                      className="col-sm-3 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                        placeholder="Password"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label
                      htmlFor="exampleInputConfirmPassword2"
                      className="col-sm-3 col-form-label"
                    >
                      Re Password
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="password"
                        className="form-control"
                        id="exampleInputConfirmPassword2"
                        placeholder="Password"
                      />
                    </div>
                  </Form.Group>
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                      Remember me
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-gradient-primary mr-2"
                  >
                    Submit
                  </button>
                  <button className="btn btn-light">Cancel</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">TestSets</h4>
                <p className="card-description">
                  {" "}
                  <code>Select TestSets, </code>for adding into Project.
                </p>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Product</th>
                        <th>Sale</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Jacob</td>
                        <td>Photoshop</td>
                        <td className="text-danger">
                          {" "}
                          28.76% <i className="mdi mdi-arrow-down"></i>
                        </td>
                        <td>
                          <label className="badge badge-danger">Pending</label>
                        </td>
                      </tr>
                      <tr>
                        <td>Messsy</td>
                        <td>Flash</td>
                        <td className="text-danger">
                          {" "}
                          21.06% <i className="mdi mdi-arrow-down"></i>
                        </td>
                        <td>
                          <label className="badge badge-warning">
                            In progress
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>John</td>
                        <td>Premier</td>
                        <td className="text-danger">
                          {" "}
                          35.00% <i className="mdi mdi-arrow-down"></i>
                        </td>
                        <td>
                          <label className="badge badge-info">Fixed</label>
                        </td>
                      </tr>
                      <tr>
                        <td>Peter</td>
                        <td>After effects</td>
                        <td className="text-success">
                          {" "}
                          82.00% <i className="mdi mdi-arrow-up"></i>
                        </td>
                        <td>
                          <label className="badge badge-success">
                            Completed
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Dave</td>
                        <td>53275535</td>
                        <td className="text-success">
                          {" "}
                          98.05% <i className="mdi mdi-arrow-up"></i>
                        </td>
                        <td>
                          <label className="badge badge-warning">
                            In progress
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
