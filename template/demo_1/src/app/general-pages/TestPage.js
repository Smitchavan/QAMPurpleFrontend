import React, { Component } from "react";
import { Form } from "react-bootstrap";
export class TestPage extends Component {
  render() {
    return (
      <div>
        <div style={{ display: "flexbox" }}>
          <div className="page-header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="!#" onClick={(event) => event.preventDefault()}>
                    Form
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page"></li>
              </ol>
            </nav>
          </div>{" "}
          <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Test form</h4>
                  <p className="card-description"> Add Steps</p>
                  <form className="forms-sample">
                    <Form.Group>
                      <label htmlFor="exampleInputUsername1">Steps Name</label>
                      <Form.Control
                        type="text"
                        id="exampleInputUsername1"
                        placeholder="mention stepname"
                        size="lg"
                      />
                    </Form.Group>
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
                  <h4 className="card-title">Step table</h4>
                  {/* <p className="card-description">
                {" "}
                Add className <code>.table-dark</code>
              </p> */}
                  <div className="table-responsive">
                    <table className="table table-dark">
                      <thead>
                        <tr>
                          <th> # </th>
                          <th> Step name </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> 1 </td>
                          <td> Herman Beck </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <form className="form-sample">
                <p className="card-description"> Test Case info </p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        First Name
                      </label>
                      <div className="col-sm-9">
                        <Form.Control type="text" />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Last Name
                      </label>
                      <div className="col-sm-9">
                        <Form.Control type="text" />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Gender</label>
                      <div className="col-sm-9">
                        <select className="form-control">
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Date of Birth
                      </label>
                      <div className="col-sm-9">
                        {/* <DatePicker
                          className="form-control w-100"
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                        /> */}
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Category
                      </label>
                      <div className="col-sm-9">
                        <select className="form-control">
                          <option>Category1</option>
                          <option>Category2</option>
                          <option>Category3</option>
                          <option>Category4</option>
                        </select>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Membership
                      </label>
                      <div className="col-sm-4">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="ExampleRadio4"
                              id="membershipRadios1"
                              defaultChecked
                            />{" "}
                            Free
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-5">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="ExampleRadio4"
                              id="membershipRadios2"
                            />{" "}
                            Proffessional
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                    </Form.Group>
                  </div>
                </div>
                {/* <p className="card-description"> Address </p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Address 1
                      </label>
                      <div className="col-sm-9">
                        <Form.Control type="text" />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">State 1</label>
                      <div className="col-sm-9">
                        <Form.Control type="text" />
                      </div>
                    </Form.Group>
                  </div>
                </div> */}
                {/* <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Address 2
                      </label>
                      <div className="col-sm-9">
                        <Form.Control type="text" />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Postcode
                      </label>
                      <div className="col-sm-9">
                        <Form.Control type="text" />
                      </div>
                    </Form.Group>
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Cirt</label>
                      <div className="col-sm-9">
                        <Form.Control type="text" />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Country</label>
                      <div className="col-sm-9">
                        <select className="form-control">
                          <option>America</option>
                          <option>Italy</option>
                          <option>Russia</option>
                          <option>Britain</option>
                        </select>
                      </div>
                    </Form.Group>
                    <button
                      type="submit"
                      className="btn btn-gradient-primary mr-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TestPage;
