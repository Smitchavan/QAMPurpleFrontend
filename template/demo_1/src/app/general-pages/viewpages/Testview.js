import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Pagination from "../../pagination/Pagination";
export default class Testview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testcasedata: [],
      setModal: false,
      testcaseid: "",

      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 0,
      pageCount: 0,
      formdata: {
        testname: "",
        testinfo: "",
        status: "",
        testlevel: "",
        assigntoproject: "",
      },
      isExpired: false,
    };
    this.setState = this.setState.bind(this);
  }
  componentDidMount() {
    this.loadtestcases();
  }
  DeleteStep = async (step, caseid) => {
    console.log("HII", step, caseid);
    let Result = await axios.post(
      "http://localhost:5000/api/testcase/deletestep",
      { data: { stepid: step, id: caseid } }
    );
    console.log(Result);
    if (Result.data.modifiedCount === 1) {
      toast.success("test removed successfully");
      this.refreshPage();
    } else {
      toast.error("Test Case does not exist,Please Refresh");
    }
  };
  refreshPage() {
    window.location.reload(false);
  }
  HandleTestpageSearch = async (e) => {
    e.preventDefault();
    await this.setState({ query: e.target.value });
    // submit search query to Node.js app
    let result = await axios.get(
      "http://localhost:5000/api/testcase/searchtestcase?q=" + this.state.query
    );

    // console.log(result.data);
    this.setState({ testcasedata: result.data });
  };
  DeleteCase = async (id) => {
    this.setState((prevState) => ({
      testcasedata: prevState.testcasedata.filter((test) => test._id !== id),
    }));

    let response = await axios.delete(
      "http://localhost:5000/api/testcase/deltestbyid",
      {
        data: { id: id },
      }
    );
    console.log(response);
    if (response.data === "") {
      toast.error("This TestSet Doesnt Exist");
    }
  };
  handlechange = async (e) => {
    e.preventDefault();
    // this.setState({selectedTestId: selectedId});
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    await this.setState({
      formdata: { ...this.state.formdata, [name]: value },
    });
    console.log(this.state.formdata);
  };
  Onupdate = async (e) => {
    e.preventDefault();
    console.log(this.state.formdata);
    let obj = this.state.formdata;
    let id = this.state.testcaseid;
    console.log(id);
    let result = await axios.post(
      "http://localhost:5000/api/testcase/updatetestwithid",
      {
        data: {
          id: id,
          data: obj,
        },
      }
    );
    if (result.data.err === "typeerror") {
      console.log(result.data.error.errors);
      toast.error("this testset doesnt exist");
      // console.log(result.status === 200);
    } else {
      console.log(result.data);
      this.refreshPage();
      if (result.data.testname !== "")
        return toast.success(`testcase is updated`);
    }
  };
  OpenModal = (id) => {
    console.log(id);
    let tid = id._id;
    let name = id.testname;
    let status = id.status;

    let testlevel = id.testlevel;
    let testinfo = id.testlevel;

    this.setState({
      setModal: true,
      testcaseid: tid,
      formdata: {
        testname: name,
        testinfo: testinfo,
        status: status,
        testlevel: testlevel,
        assigntoproject: "",
      },
    });
  };
  loadtestcases = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token === null) {
      this.setState({ isExpired: true });
    }
    try {
      const itemsPerPage = this.state.itemsPerPage;
      axios
        .get("http://localhost:5000/api/testcase/gettests", {
          params: {
            page: this.state.currentPage,
            limit: itemsPerPage,
          },
          headers: {
            "x-auth-token": token,
          },
        })
        .then((res) => {
          let data = res.data.Gettest;
          this.setState({ testcasedata: data });

          this.setState({ data });
          this.setState({ totalItems: res.data.counter });
          this.setState({
            pageCount: Math.ceil(
              this.state.totalItems / this.state.itemsPerPage
            ),
          });
          console.log(res.data);
        })
        .catch((err) => {
          if (err.response.data.error === "jwt expired") {
            console.log(err);
            this.setState({ isExpired: true });
          } else {
            console.log(err.response.data.error);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  handlePageChange = (data) => {
    //here any param by default returns object with selected as key and page no. as value
    this.setState({ currentPage: data.selected + 1 }, this.loadtestcases);
    // console.log(this.fetchData)
  };
  render() {
    return (
      <div>
        <Toaster />
        {this.state.isExpired === true && <Redirect to="/login" />}
        <Form.Group>
          <div className="input-group">
            <Form.Control
              type="text"
              className="form-control"
              placeholder="search testcase by name or info"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={this.state.query}
              onChange={this.HandleTestpageSearch}
            />
            <div className="input-group-append">
              <button className="btn btn-sm btn-gradient-primary" type="button">
                Search
              </button>
            </div>
          </div>
        </Form.Group>
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Testcase table</h4>
              <p className="card-description"> </p>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th> TestCase name </th>
                      <th> TestLevel</th>
                      <th> TestInfo </th>
                      <th> Status </th>
                      <th>Steps</th>
                      <th> Assigned to TestSet </th>
                      <th>
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  {this.state.testcasedata.map((val) => (
                    <tbody>
                      <tr>
                        <td> {val.testname}</td>
                        <td>{val.testlevel}</td>
                        <td> {val.testinfo}</td>
                        <td> {val.status} </td>
                        <td>
                          {val.stepArr
                            ? val.stepArr.map((vall) => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                  }}
                                >
                                  <div>{vall.steps}</div>{" "}
                                  <i
                                    className="mdi mdi-delete"
                                    style={{
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      this.DeleteStep(vall._id, val._id)
                                    }
                                  ></i>
                                </div>
                              ))
                            : null}
                        </td>
                        <td>{val.assigntoproject} </td>
                        <td>
                          <center>
                            <i
                              className="mdi mdi-delete-sweep"
                              style={{
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => this.DeleteCase(val._id)}
                            ></i>
                            <i
                              className="mdi mdi-arrow-up-bold-hexagon-outline"
                              style={{
                                fontSize: "20px",
                                cursor: "pointer",
                                marginLeft: "5px",
                              }}
                              onClick={(e) => this.OpenModal(val)}
                            ></i>
                          </center>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>

          <Link to="home">
            <i
              className="mdi mdi-home-variant"
              style={{
                fontSize: "30px",
                cursor: "pointer",
                marginLeft: "5px",
              }}
            ></i>
          </Link>
          <Pagination
            currentPage={this.state.currentPage}
            handlePageChange={this.handlePageChange}
            pageCount={this.state.pageCount}
          />
        </div>
        <Modal
          show={this.state.setModal}
          onHide={() => this.setState({ setModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Test Page</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {" "}
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <form className="form-sample">
                    <p className="card-description"> Test Case info </p>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label>Test Name</label>
                          <div className="col-sm-9">
                            <Form.Control
                              id="test"
                              type="text"
                              name="testname"
                              autoComplete="off"
                              value={this.state.formdata.testname}
                              onChange={this.handlechange}
                            />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label>Test Info</label>
                          <div className="col-sm-9">
                            <Form.Control
                              id="info"
                              type="text"
                              autoComplete="off"
                              name="testinfo"
                              value={this.state.formdata.testinfo}
                              onChange={this.handlechange}
                            />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label>Status</label>
                          <div className="col-sm-9">
                            <select
                              id="status"
                              className="form-control"
                              name="status"
                              value={this.state.formdata.status}
                              onChange={this.handlechange}
                            >
                              <option value="">select</option>
                              <option value="started">Started</option>
                              <option value="pending">Pending</option>
                              <option value="in progress">In Progress</option>
                              <option value="Fixed">Fixed</option>
                            </select>
                          </div>
                        </Form.Group>
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label>Level</label>
                          <div className="col-sm-9">
                            <select
                              id="level"
                              className="form-control"
                              onChange={this.handlechange}
                              value={this.state.formdata.testlevel}
                              name="testlevel"
                            >
                              <option value="">select</option>
                              <option value="high">High</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="emergency">Emergency</option>
                            </select>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <button
                          type="submit"
                          className="btn btn-gradient-primary mr-2"
                          onClick={this.Onupdate}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <button onClick={() => this.setState({ setModal: false })}>
                Close
              </button> */}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
