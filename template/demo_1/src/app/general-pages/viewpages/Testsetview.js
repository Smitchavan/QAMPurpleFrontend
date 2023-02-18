import React, { Component } from "react";
// import { ProgressBar } from "react-bootstrap";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Modal } from "react-bootstrap";
import { promisify } from "util";

export default class Testsetview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AlltestsetData: [],
      setModal: false,
      setModalT: false,
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
  }
  refreshPage() {
    window.location.reload(false);
  }
  Updatetestset = async (data) => {
    await this.setState({ setModalT: true, testsetupdate: data });
  };
  GetAlltestSet = () => {
    axios.get("http://localhost:5000/api/testset/gettestsets").then((res) => {
      //console.log(res.data);
      this.setState({ AlltestsetData: res.data });
    });
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
      if (result.status) {
        this.refreshPage();
      } else {
        console.log(result.data);
      }
    }

    //
  };
  Handlechange = async (e, data, id) => {
    if (data) {
      // console.log(data);
      // console.log(e);
      // console.log(id);
      let updatestate = promisify(this.setState);
      await updatestate({
        setModal: true,
        testcase: e,
        testsetid: data,
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
    // console.log("testcase", id);
    // console.log("testset", this.state.testsetid);
    let Result = await axios.post(
      "http://localhost:5000/api/testset/deltestfromid",
      { data: { testsetId: this.state.testsetid, id: id } }
    );
    console.log(Result);
    if (Result.data.modifiedCount === 1) {
      toast.success("test removed successfully");
      this.refreshPage();
    } else {
      toast.error("Test Case does not exist,Please Refresh");
    }
  };
  render() {
    return (
      <div>
        {" "}
        <Toaster />
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
                  {this.state.AlltestsetData.map((val) => (
                    <tbody key={val._id}>
                      <tr>
                        <td> {val.testsetname} </td>

                        <td> {val.assigntoproject}</td>
                        <td>
                          {val.testcases.map((valu) => (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                cursor: "pointer",
                              }}
                            >
                              <div>{valu.testname} </div>{" "}
                              <button
                                className="mdi mdi-open-in-new"
                                onClick={() => this.Handlechange(valu, val._id)}
                              ></button>
                            </div>
                          ))}{" "}
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
                              <td>
                                {this.state.testcase.stepArr?.map((val) => (
                                  <div>
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
                                        onClick={() => console.log(val._id)}
                                      ></i>
                                    </div>
                                  </div>
                                ))}
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
                                      this.Deletestcase(this.state.testcase._id)
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
        </div>
      </div>
    );
  }
}

/* <ProgressBar variant="success" now={25} /> */
