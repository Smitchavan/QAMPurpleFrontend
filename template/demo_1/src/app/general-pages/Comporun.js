import axios from "axios";
import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { toast, Toaster } from "react-hot-toast";
// import { Dropdown } from "react-bootstrap";
import Timer from "./timer/Timer";
export default class Comporun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      testcasedata: {},
      setModal: false,
      status: "",
      description: "",
      currentDate: "",
      currentTime: "",
      stepdata: {},
      pauseTime: "",
      showStopButton: false,
    };
    this.setState = this.setState.bind(this);
  }

  async componentDidMount() {
    // console.log(this.props.data);
    // const { seconds, minutes, hours } = useTimer({
    //   expiryTimestamp: Date.now() + 60000,
    // });
    let dataL = {
      ...this.state.data,
      runStarttime: moment().format("MMMM Do YYYY, h:mm:ss a"),
    };
    await this.setState({ data: dataL });

    // console.log(this.state.data);
    this.intervalID = setInterval(
      () =>
        this.setState({
          currentTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
          currentDate: moment().format("MMMM Do YYYY, h:mm:ss a"),
        }),
      1000
    );
  }

  runEndtime = async () => {
    // this.updateApi();
    let dataL = {
      ...this.state.data,
      runEndtime: moment().format("MMMM Do YYYY, h:mm:ss a"),
    };
    await this.setState({ data: dataL }, () => {
      console.log("hiii stateend", this.state.data);
    });

    this.updateApi();
    // console.log(this.state.data);
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.shouldUpdateTime && !prevProps.shouldUpdateTime) {
  //     this.runEndtime();
  //   }
  // }
  componentWillUnmount() {
    // Clear the interval before unmounting the component
    // this.runEndtime(this.state.data);

    let dataL = {
      ...this.state.data,
      runEndtime: moment().format("MMMM Do YYYY, h:mm:ss a"),
    };
    // await this.setState({ data: dataL }, () => {
    //   console.log("hiii stateend", this.state.data);
    // });
    this.state.data = dataL;
    // console.log(this.state.data);
    this.updateApi();

    clearInterval(this.intervalID);
  }
  loadRunByid = async () => {
    let result = await axios.get(
      "http://localhost:5000/api/testrun/getrunbyid",
      { params: { runid: this.props.runid } }
    );
    // console.log("hii", result.data.testRun);
    await this.setState({ data: result.data.testRun });

    console.log("HIII", this.state.data);
  };

  Msubmit = async () => {
    let { status, description, stepdata } = this.state;
    // console.log(status, "h", description);
    if (status === "failed" && description === "") {
      toast.error("plzz enter description if failed");
    } else {
      let id = stepdata._id;

      let ttime = this.state.currentTime;

      let result = {
        status: status,
        description: description,
        checkTime: ttime,
      };
      // console.log(result);
      const updatedStepArr = this.state.testcasedata.stepArr.map((step) => {
        if (step._id === id) {
          return {
            ...step,

            result: result,
          };
        } else {
          return step;
        }
      });

      if (this.state.testcasedata.stepArr !== updatedStepArr) {
        await this.setState({
          testcasedata: {
            ...this.state.testcasedata,
            stepArr: updatedStepArr,
          },
          status: "",
          description: "",
          setModal: false,
        });
        toast.success("data updated");
        this.updateData();
        this.updateApi();
      }

      // console.log(this.state.data);

      // console.log(this.state.testcasedata);
      // this.updateSteps();
      // Update the component state with the new array

      // console.log(this.state.testcasedata);
    }
  };

  // updateSteps = async () => {
  //   console.log("comporuns", this.props.data.testcases);
  //   // this.setState({ data: this.props.data });
  //   let testdata = { data: this.state.testcasedata, runid: this.props.runid };

  //   let result = await axios.post(
  //     "http://localhost:5000/api/testrun/updatesteps",
  //     { data: testdata }
  //   );
  //   console.log(result.data);
  //   this.props.loadruns();
  // };
  updateApi = async () => {
    // console.log("comporuns", this.props.data.testcases);
    // this.setState({ data: this.props.data });
    let testdata = { data: this.state.data, runid: this.props.runid };

    let result = await axios.post(
      "http://localhost:5000/api/testrun/updatesteps",
      { data: testdata }
    );
    console.log(result.data);
    this.loadRunByid();
    // this.props.loadruns();
  };

  passData = async (data) => {
    // console.log(data);
    await this.setState({ pauseTime: data });

    if (this.state.testcasedata.counttesterTime) {
      await this.state.testcasedata.counttesterTime.push(data);
      console.log(this.state.testcasedata.counttesterTime);
      this.updateData();
      this.updateApi();
    }
  };
  indexTestcase = async (tdata) => {
    // console.log(tdata);
    let name = tdata.testname;
    const smile = document.getElementById("smile").innerHTML;
    if (name === smile) return;
    // if (name !== smile) return toast.error("please save the existing testcase");
    this.setState({ showStopButton: true });

    let ttime = this.state.currentTime;

    let obj = [
      {
        time: ttime,
        type: "isStarted",
      },
    ];

    let godata = { ...tdata, counttesterTime: obj };
    await this.setState({ testcasedata: godata });

    // ----------------------------------------------
    // if (tdata !== this.state.testcasedata) {
    //   toast.error("please save the progress");
    // }
  };
  handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log("name", name, "value", value);
    this.setState({
      [name]: value,
    });
  };

  updateData = async () => {
    let { testcasedata } = this.state;

    const updatedStepArr = this.state.data.testcases.map((icase) => {
      if (icase._id === testcasedata._id) {
        return {
          ...icase,
          ...testcasedata,
        };
      } else {
        return icase;
      }
    });

    if (this.state.data.testcases !== updatedStepArr) {
      await this.setState({
        data: {
          ...this.state.data,
          testcases: updatedStepArr,
        },
      });
      // toast.success("data updated");
    }
    console.log(this.state.data);
  };
  SubmitTest = async (e) => {
    e.preventDefault();
    this.updateApi();
    this.updateApi();
  };

  handleStop = async (e) => {
    e.preventDefault();
    this.setState({ showStopButton: false });
    let ttime = this.state.currentTime;

    const data = {
      time: ttime,
      type: "isStopped",
    };
    if (this.state.testcasedata.counttesterTime) {
      await this.state.testcasedata.counttesterTime.push(data);
      this.updateData();
      this.updateApi();
      this.setState({ testcasedata: [] });
      // console.log(this.state.testcasedata.counttesterTime);
      // this.updateSteps();
      // this.setState({ testcasedata: [] });
    }
  };
  render() {
    let { testcasedata } = this.state;
    return (
      <div>
        <Toaster />
        {/* <Timer /> */}
        <div className="col-12 grid-margin stretch-card">
          {" "}
          <div className="card">
            <div
              className="card-body"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {/* {console.log(this.state.data)} */}
              <div>{this.state.data.testsetname}</div>
              <div>{this.state.currentDate}</div>
            </div>
          </div>
        </div>
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <form
                className="forms-sample"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {/* <button type="button" className="btn btn-outline-dark btn-fw">Dark</button> */}
                <div>
                  {this.state.data.testcases.map((val, index) => (
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-fw"
                      onClick={() => this.indexTestcase(val)}
                      key={index}
                      disabled={
                        this.state.showStopButton
                          ? testcasedata.testname &&
                            testcasedata.testname !== val.testname
                          : false
                      }
                    >
                      {val.testname}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex" }}>
                  <Timer
                    passData={this.passData}
                    button={this.state.showStopButton}
                  />
                  {this.state.showStopButton && (
                    <i
                      className="mdi mdi-stop"
                      style={{
                        fontSize: "30px",
                        cursor: "pointer",
                        marginLeft: "20px",
                      }}
                      onClick={this.handleStop}
                    ></i>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <form className="forms-sample">
                  <Form.Group className="row">
                    <label
                      htmlFor="exampleInputUsername2"
                      className="col-sm-3 col-form-label"
                    >
                      TestCase Name
                    </label>
                    <div className="col-sm-9">
                      <blockquote
                        className="blockquote"
                        style={{ fontSize: "14px" }}
                        id="smile"
                      >
                        {testcasedata.testname}
                      </blockquote>
                    </div>
                  </Form.Group>

                  <button
                    type="submit"
                    className="btn btn-gradient-primary mr-2"
                    onClick={this.SubmitTest}
                  >
                    Submit
                  </button>
                  <button className="btn btn-light">Cancel</button>
                </form>
                {/* <Form.Group className="row">
                  <form className="forms-sample">
                    <label htmlFor="exampleInputName1">TestCase Name</label>
                    <blockquote className="blockquote"></blockquote>

                    <button
                      type="submit"
                      className="btn btn-gradient-primary mr-2"
                    >
                      Submit
                    </button>
                    <button className="btn btn-light">Cancel</button>
                  </form>
                </Form.Group>{" "} */}
              </div>
            </div>
          </div>
          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Step Table</h4>

                <div className="table-responsive">
                  <table className="table table-hover">
                    {/* {console.log(this.state.testcasedata.stepArr)} */}
                    {testcasedata.stepArr
                      ? testcasedata.stepArr.map((val) => (
                          <tbody
                            onClick={() =>
                              this.setState({ setModal: true, stepdata: val })
                            }
                          >
                            {val.result ? (
                              val.result.status === "passed" ? (
                                <tr className="table-success">
                                  <td>
                                    <center>{val.steps}</center>
                                  </td>
                                  {/* <td>{val.result.status}</td> */}
                                </tr>
                              ) : val.result.status === "failed" ? (
                                <tr className="table-danger">
                                  <td>
                                    <center>{val.steps}</center>
                                  </td>
                                  {/* <td>{val.result.status}</td> */}
                                </tr>
                              ) : val ? (
                                <tr className="table-danger">
                                  <td>{val.steps}</td>
                                  {/* <td>{val.result.status}</td> */}
                                </tr>
                              ) : null
                            ) : (
                              <tr>
                                <td>
                                  <center>{val.steps}</center>
                                </td>
                                {/* <td>{val.result.status}</td> */}
                              </tr>
                            )}
                          </tbody>
                        ))
                      : null}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={this.state.setModal}
          onHide={() => this.setState({ setModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Check {this.state.stepdata.steps}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-6">
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">Result</label>
                <div className="col-sm-9">
                  <select
                    id="status"
                    className="form-control"
                    name="status"
                    value={this.state.status}
                    onChange={this.handleChange}
                  >
                    <option value="">select</option>
                    <option value="passed">Passed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </Form.Group>
            </div>
            <form className="forms-sample">
              <Form.Group>
                <p className="card-description"> </p>
                <label htmlFor="exampleTextarea1">Description</label>
                <textarea
                  className="form-control"
                  id="exampleTextarea1"
                  rows="4"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                ></textarea>
              </Form.Group>
            </form>
          </Modal.Body>{" "}
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-inverse-success btn-fw"
              onClick={this.Msubmit}
            >
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
