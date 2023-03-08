import React, { Component } from "react";
// import { ProgressBar } from "react-bootstrap";
import axios from "axios";
import Pagination from "../../pagination/Pagination";
import { Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Modal } from "react-bootstrap";
import { promisify } from "util";

export default class Testsetview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AlltestsetData: [],
      testcasedata: [],
      testcaseid: "",
      setModal: false,
      setModalT: false,
      setModalTh: false,

      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 0,
      pageCount: 0,
      showAll: {},

      tempsetdata: [],
      testcase: [],
      testsetupdate: [],

      testsetid: "",
      testsetname: "",
      assigntoproject: "",
    };
    this.setState = this.setState.bind(this);
  }
  componentDidMount() {
    this.GetAlltestSet();
    this.loadtestcases();
  }
  refreshPage() {
    window.location.reload(false);
  }
  handlePageChange = (data) => {
    //here any param by default returns object with selected as key and page no. as value

    this.setState({ currentPage: data.selected + 1 }, this.GetAlltestSet);
    // console.log(this.fetchData)
  };
  handleMPageChange = (data) => {
    this.setState({ currentPage: data.selected + 1 }, this.loadtestcases);
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
  Updatetestset = async (data) => {
    await this.setState({ setModalT: true, testsetupdate: data });
  };
  loadtestcases = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    try {
      // axios.get("http://localhost:5000/api/testcase/gettests").then((res) => {
      //   // console.log(res.data);

      //   this.setState({ testcasedata: res.data.Gettest });
      // });
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
        })
        .catch((error) => {
          if (error.response.data.msg)
            return toast.error(error.response.data.msg);

          toast.error(error.response.data.error);
          this.setState({ isExpired: true });
        });
    } catch (error) {
      console.log(error);
    }
  };

  GetAlltestSet = async (dataset) => {
    try {
      const itemsPerPage = this.state.itemsPerPage;
      let res = await axios.get(
        "http://localhost:5000/api/testset/gettestsets",
        {
          params: {
            page: this.state.currentPage,
            limit: itemsPerPage,
          },
        }
      );
      let data = res.data.Result;
      console.log(data);
      await this.setState({ AlltestsetData: data, tempsetdata: dataset });
      this.setState({ data });
      this.setState({ totalItems: res.data.counter });
      this.setState({
        pageCount: Math.ceil(this.state.totalItems / this.state.itemsPerPage),
      });
      // this.setState({ testcasedata: res.data });
      // await this.setState({ testcase: res });
      // console.log("latest console data", this.state.AlltestsetData);
    } catch (error) {
      console.log(error);
    }

    // console.log("esata", this.state.AlltestsetData);
  };

  updateSubmit = async (e) => {
    e.preventDefault();
    let id = this.state.testsetupdate._id;
    console.log(id);
    let { testsetname, assigntoproject } = this.state;
    let obj = { testsetname, assigntoproject };

    if (obj.testsetname === undefined || obj.testsetname === "") {
      toast.error("please fill testname");
    } else {
      let result = await axios.post(
        "http://localhost:5000/api/testset/updatewithid",
        {
          data: {
            id: id,
            data: obj,
          },
        }
      );
      if (result.data.err === "typeerror") {
        console.log(result.data);
        toast.error("this testset doesnt exist");
        // console.log(result.status === 200);
      } else {
        console.log(result.data);
        this.refreshPage();
      }
    }

    //
  };
  Inserttestcase = async (data) => {
    console.log(this.state.tempsetdata);
    console.log(data);
    let Timeid = Date.now();

    let newData = { ...data, Timeid };
    let tid = this.state.testsetid;

    console.log(tid);

    if (this.state.tempsetdata === undefined) {
      console.log("no preblem");
    } else if (
      this.state.tempsetdata.testcases.some((item) => item._id === data._id)
    ) {
      let answer = window.confirm(
        "Testcase is Already added do you want to add it again"
      );
      if (answer) {
        try {
          let Result = await axios.post(
            "http://localhost:5000/api/testset/inserttestsbyid",
            [{ id: tid }, { testcaseinfo: newData }]
          );
          console.log(Result);
          // console.log(data.testname);
          toast.success(`test case "${data.testname}" added successfully`);
          this.GetAlltestSet(Result.data);
        } catch (error) {
          console.log(error);
        }
        return;
      } else {
        console.log(" not done");
        return;
      }
    }
    if (this.state.testsetid === undefined) {
      toast.error("Please select testset first");
    } else {
      try {
        let Result = await axios.post(
          "http://localhost:5000/api/testset/inserttestsbyid",
          [{ id: tid }, { testcaseinfo: newData }]
        );
        console.log(Result);
        // console.log(data.testname);
        toast.success(`test case "${data.testname}" added successfully`);
        this.GetAlltestSet(Result.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  OpenModal = async (id) => {
    // console.log("hii", id);

    this.setState({ setModalTh: true, testsetid: id });
  };
  Handlechange = async (e, data) => {
    if (data) {
      // console.log("data", data);
      // console.log("e", e);
      // console.log("id", e._id);
      let testid = e._id;
      let updatestate = promisify(this.setState);
      await updatestate({
        setModal: true,
        testcase: e,
        testsetid: data,
        testcaseid: testid,
      });
    } else {
      e.preventDefault();
      // console.log("data", id);
      // console.log("data", data);
      const { name, value } = e.target;
      //console.log(e.target);
      // console.log("name", name, "value", value);
      await this.setState({
        [name]: value,
      });
    }

    // console.log(updatestate);
  };
  Delstep = async (testsetid, data) => {
    // console.log(data._id);
    let id = data._id;
    // console.log(testsetid);
    let testid = this.state.testcaseid;
    // console.log(testid);
    // console.log("prabhas", this.state.testcase);
    // console.log(this.state.testcase);

    this.setState((prevState) => {
      const newObj = { ...prevState.testcase };

      const indexToDelete = newObj.stepArr.findIndex((item) => item._id === id);

      if (indexToDelete !== -1) {
        newObj.stepArr.splice(indexToDelete, 1);
      }

      return {
        ...prevState,
        testcase: newObj,
      };
    });

    let Result = await axios.post(
      "http://localhost:5000/api/testset/delstepfromtestset",
      { data: { testsetId: testsetid, id: id, testid: testid } }
    );
    console.log(Result);
    if (Result.data.modifiedCount === 1) {
      // this.loadtestcases();
      toast.success("step removed successfully");
    } else {
      toast.error("Test Case does not exist,Please Refresh");
    }
  };
  HandleTestsetSearch = async (e) => {
    e.preventDefault();
    await this.setState({ query: e.target.value });
    // submit search query to Node.js app
    let result = await axios.get(
      "http://localhost:5000/api/testset/searchtestset?q=" + this.state.query
    );

    // console.log(result.data);
    this.setState({ AlltestsetData: result.data });
  };
  Deletetestset = async (id) => {
    this.setState((prevState) => ({
      AlltestsetData: prevState.AlltestsetData.filter(
        (test) => test._id !== id
      ),
    }));

    let Response = await axios.delete(
      "http://localhost:5000/api/testset/deltestsetbyid",
      {
        data: { id: id },
      }
    );
    console.log(Response);

    if (Response.data === "") {
      toast.error("This TestSet Doesnt Exist");
    }
  };

  Deletestcase = async (id) => {
    // console.log(this.state.AlltestsetData);
    let TSid = this.state.testsetid;
    const updatedState = this.state.AlltestsetData.map((obj) => {
      if (obj._id === TSid) {
        const updatedNestedArray = obj.testcases.filter(
          (nestedObj) => nestedObj.Timeid !== id
        );
        return { ...obj, testcases: updatedNestedArray };
      }
      return obj;
    });
    this.setState({ AlltestsetData: updatedState });
    console.log(this.state.AlltestsetData);
    let Result = await axios.post(
      "http://localhost:5000/api/testset/deltestfromid",
      { data: { testsetId: TSid, id: id } }
    );

    console.log(Result);
    if (Result.data.modifiedCount === 1) {
      toast.success("test removed successfully");
      // this.refreshPage();
    } else {
      toast.error("Test Case does not exist,Please Refresh");
    }
  };
  handleButtonClick = (testsetId) => {
    if (testsetId) {
      const showObj = {};
      showObj[`${testsetId}`] = !this.state.showAll[`${testsetId}`];
      this.setState({
        showAll: {
          ...this.state.showAll,
          ...showObj,
        },
      });
    }
  };
  render() {
    const { showAll } = this.state;
    return (
      <div>
        {" "}
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
              onChange={this.HandleTestsetSearch}
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
              <h4 className="card-title">TestSet table</h4>
              <p className="card-description"> </p>
              <div className="table-responsive">
                {/* {console.log(this.state.AlltestsetData)} */}
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th> TestSet Name</th>
                      <th> Assigned to Project </th>
                      <th> TestCases</th>
                      <th>
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  {this.state.AlltestsetData.map((val, index) => (
                    <tbody key={index}>
                      <tr>
                        <td> {val.testsetname} </td>

                        <td> {val.assigntoproject}</td>
                        <td>
                          <div>
                            {/* {console.log(val.testcases.length)} */}
                            {val.testcases.map((valu, index) => (
                              <div key={index + valu._id}>
                                <div
                                  style={{
                                    display:
                                      index === 0 || showAll[`${val._id}`]
                                        ? "flex"
                                        : "none",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                  }}
                                >
                                  <div
                                    style={{
                                      margin: 7,
                                    }}
                                  >
                                    {valu.testname}{" "}
                                  </div>
                                  <button
                                    className="mdi mdi-open-in-new"
                                    style={{
                                      marginBottom: 5,
                                    }}
                                    onClick={() =>
                                      this.Handlechange(valu, val._id)
                                    }
                                  ></button>
                                </div>
                              </div>
                            ))}
                            {val.testcases.length !== 1 &&
                            val.testcases.length !== 0 ? (
                              <i
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  this.handleButtonClick(val ? val._id : "");
                                }}
                              >
                                {showAll[`${val._id}`] ? "^" : "......"}
                              </i>
                            ) : null}
                          </div>
                        </td>
                        <td>
                          <center>
                            <i
                              className="mdi mdi-delete-sweep"
                              style={{
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => this.Deletetestset(val._id)}
                            ></i>
                            <i
                              className="mdi mdi-arrow-up-bold-hexagon-outline"
                              style={{
                                fontSize: "20px",
                                cursor: "pointer",
                                marginLeft: "5px",
                              }}
                              onClick={() => this.Updatetestset(val)}
                            ></i>
                            <i
                              className="mdi mdi-plus-circle"
                              style={{
                                fontSize: "20px",
                                cursor: "pointer",
                                marginLeft: "5px",
                              }}
                              onClick={() => this.OpenModal(val._id)}
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
          <Pagination
            currentPage={this.state.currentPage}
            handlePageChange={this.handlePageChange}
            pageCount={this.state.pageCount}
          />
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
          <Modal
            show={this.state.setModal}
            onHide={() => this.setState({ setModal: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Test Page</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {" "}
              <div className="row">
                <div className="col-12 grid-margin">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Selected testcase info</h4>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th> Testcase Name</th>
                              <th> Test Info </th>
                              <th> Status </th>
                              <th> Test Level </th>
                              <th> Assign to project </th>
                              <th>Steps</th>
                              <th> Actions </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> {this.state.testcase.testname}</td>
                              <td> {this.state.testcase.testinfo} </td>
                              <td>
                                <label className="badge badge-gradient-danger">
                                  {this.state.testcase.status}
                                </label>
                              </td>
                              <td> {this.state.testcase.testlevel} </td>
                              <td> {this.state.testcase.assigntoproject}</td>
                              {/* {console.log("p k data", this.state.testcase)} */}
                              <td>
                                {this.state.testcase.stepArr
                                  ? this.state.testcase.stepArr.map(
                                      (val, index) => (
                                        <div key={index}>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <div>{val.steps}</div>
                                            <i
                                              className="mdi mdi-delete"
                                              style={{
                                                fontSize: "20px",
                                                cursor: "pointer",
                                                marginLeft: "10px",
                                              }}
                                              onClick={() =>
                                                this.Delstep(
                                                  this.state.testsetid,
                                                  val
                                                )
                                              }
                                            ></i>
                                          </div>
                                        </div>
                                      )
                                    )
                                  : null}
                              </td>
                              <td>
                                <div>
                                  <i
                                    className="mdi mdi-delete-sweep"
                                    style={{
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      this.Deletestcase(
                                        this.state.testcase.Timeid
                                      )
                                    }
                                  ></i>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
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
          <Modal
            show={this.state.setModalT}
            onHide={() => this.setState({ setModalT: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>TestSet Update</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputUsername1">Testset Name</label>
                  <Form.Control
                    type="text"
                    id="testsetname"
                    placeholder="Testsetname"
                    size="lg"
                    name="testsetname"
                    value={this.state.testsetname}
                    onChange={this.Handlechange}
                  />
                </Form.Group>

                <Form.Group>
                  <label htmlFor="exampleInputConfirmPassword1">
                    Assign To Project
                  </label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="project"
                    placeholder="assigntoproject"
                    name="assigntoproject"
                    value={this.state.assigntoproject}
                    onChange={this.Handlechange}
                  />
                </Form.Group>

                <button
                  type="submit"
                  className="btn btn-gradient-primary mr-2"
                  onClick={this.updateSubmit}
                >
                  Submit
                </button>
              </form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
          <Modal
            show={this.state.setModalTh}
            onHide={() => this.setState({ setModalTh: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>ADD TESTCASES</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {" "}
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
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Test case name</th>
                          <th>Testlevel</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {this.state.testcasedata.map((val) => (
                        <tbody>
                          <tr>
                            <td>{val.testname}</td>
                            <td>{val.testlevel}</td>
                            <td className="text-danger">{val.testlevel}</td>
                            <td>
                              <i
                                className="mdi mdi-plus"
                                style={{
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
                                onClick={() => this.Inserttestcase(val)}
                              ></i>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
              <Pagination
                currentPage={this.state.currentPage}
                handlePageChange={this.handleMPageChange}
                pageCount={this.state.pageCount}
              />
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

/* <ProgressBar variant="success" now={25} /> */
