import React, { Component } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-hot-toast";

export default class TestSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testcasedata: [],
      testbyid: "",
      query: "",
      testsetdata: [],
      AlltestsetData: [],
      checked: false,
      testsetForm: {
        testsetname: "",
        testcases: [],
        assigntoproject: "",
      },
    };
  }
  componentDidMount() {
    this.loadtestcases();
    this.GetAlltestSet();
  }
  AddTest = async (test) => {
    //console.log("HIi Boy", test);
    let response = await axios.get(
      "http://localhost:5000/api/testcase/gettestbyid",
      {
        params: { id: test },
      }
    );

    this.setState({ testbyid: response.data });

    this.AddtoTestset(response.data);
  };
  AddtoTestset = async (data) => {
    // console.log(this.state.testsetdata._id);
    let testsetid = this.state.testsetdata._id;
    // console.log(data._id);
    if (this.state.testsetdata._id === undefined) {
      toast.error("Please !!!! set Testset name first");
    } else {
      try {
        let Result = await axios.post(
          "http://localhost:5000/api/testset/inserttestsbyid",
          [{ id: testsetid }, { testcaseinfo: data }]
        );
        console.log(Result);
        // console.log(data.testname);
        toast.success(`test case "${data.testname}" added successfully`);
        this.GetAlltestSet();
      } catch (error) {
        console.log(error);
      }
    }
  };
  handlesearch = async (e) => {
    e.preventDefault();
    await this.setState({ query: e.target.value });
    // submit search query to Node.js app
    let result = await axios.get(
      "http://localhost:5000/api/testcase/searchtestcase?q=" + this.state.query
    );

    // console.log(result.data);
    this.setState({ testcasedata: result.data });
  };

  handlechange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    this.setState({
      testsetForm: {
        ...this.state.testsetForm,
        [name]: value,
      },
    });
  };
  GetAlltestSet = () => {
    axios.get("http://localhost:5000/api/testset/gettestsets").then((res) => {
      // console.log(res.data);
      this.setState({ AlltestsetData: res.data });
    });
  };

  loadtestcases = () => {
    axios.get("http://localhost:5000/api/testcase/gettests").then((res) => {
      this.setState({ testcasedata: res.data });
      // console.log(res.data);
    });
  };
  GettestSet = async (testsetid) => {
    // console.log(testsetid);

    let response = await axios.get(
      "http://localhost:5000/api/testset/gettestsetbyid",
      {
        params: { id: testsetid },
      }
    );
    //console.log(response.data);
    await this.setState({
      testsetdata: response.data,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.checked === true) {
      let values = this.state.testsetForm;
      if (this.state.testsetForm.testsetname === "") {
        toast.error("please fill testsetname");
      }

      try {
        let result = await axios.post(
          "http://localhost:5000/api/testset",
          values
        );
        // console.log(result);
        if (result.status === 200) {
          toast.success("Testset added successfully");
        }
        await this.setState({
          testsetForm: {
            testsetname: "",
            assigntoproject: "",
          },
        });

        this.GettestSet(result.data._id);
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    } else {
      toast.error("please accept the condition");
    }
  };
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
                <i className="mdi mdi-compass icon-lg text-success">
                  {" "}
                  {this.state.testsetdata.testsetname}
                </i>
                <h4 className="card-title" style={{ marginTop: "50px" }}>
                  TestSet Form
                </h4>{" "}
                <p className="card-description"> Set Testset Info </p>
                <form className="forms-sample">
                  <Form.Group className="row">
                    <label
                      htmlFor="exampleInputUsername2"
                      className="col-sm-3 col-form-label"
                    >
                      Testset name
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="testset"
                        placeholder="Testset name"
                        name="testsetname"
                        value={this.state.testname}
                        onChange={this.handlechange}
                        autoComplete="off"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="row">
                    <label
                      htmlFor="exampleInputMobile"
                      className="col-sm-3 col-form-label"
                    >
                      Assign To Project
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="assign"
                        placeholder="Project name"
                        name="assigntoproject"
                        value={this.state.assigntoproject}
                        onChange={this.handlechange}
                        autoComplete="off"
                      />
                    </div>
                  </Form.Group>

                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={() => this.setState({ checked: true })}
                      />
                      <i className="input-helper"></i>I accept to create this
                      testset.
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-gradient-primary mr-2"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                  {/* <button className="btn btn-light">Cancel</button> */}
                </form>
              </div>{" "}
            </div>
          </div>

          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">TestCases</h4>
                <p className="card-description">
                  {" "}
                  <code>Select TestCases, </code>for adding into testset.
                </p>
                <Form.Group>
                  <div className="input-group">
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="search testcase by name or info"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={this.state.query}
                      onChange={this.handlesearch}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-sm btn-gradient-primary"
                        type="button"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </Form.Group>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Testname</th>
                        <th>Level</th>
                        <th>Assigned</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    {this.state.testcasedata.map((val) => (
                      <tbody
                        key={val._id}
                        onClick={() => {
                          this.AddTest(val._id);
                        }}
                      >
                        <tr>
                          <td>{val.testname}</td>
                          <td>{val.testlevel}</td>
                          <td className="text-danger">
                            {/* 28.76% <i className="mdi mdi-arrow-down"></i> */}
                            {val.assigntoproject}
                          </td>
                          <td>
                            {val.status === "pending" ? (
                              <label className="badge badge-danger">
                                Pending
                              </label>
                            ) : val.status === "in progress" ? (
                              <label className="badge badge-warning">
                                In progress
                              </label>
                            ) : val.status === "started" ? (
                              <label className="badge badge-info">
                                Started
                              </label>
                            ) : val.status === "Fixed" ? (
                              <label className="badge badge-success">
                                Fixed
                              </label>
                            ) : (
                              ""
                            )}

                            {/* <label className="badge badge-info">Fixed</label>
                            <label className="badge badge-success"></label> */}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                  {/* <table className="table table-hover">
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
                          28.76% <i className="mdi mdi-arrow-down"></i>
                        </td>
                        <td>
                          <label className="badge badge-danger">Pending</label>
                        </td>
                      </tr>
                    </tbody>
                  </table> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* <tbody>
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
                    </tbody> */
