// import axios from "axios";
import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
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
      currentDate: new Date(),
      currentTime: new Date(),
      stepdata: {},
      pauseTime: "",
    };
    this.setState = this.setState.bind(this);
  }
  componentDidMount() {
    // console.log(this.props.data);
    // const { seconds, minutes, hours } = useTimer({
    //   expiryTimestamp: Date.now() + 60000,
    // });
    this.intervalID = setInterval(
      () => this.setState({ currentTime: new Date(), currentDate: new Date() }),
      1000
    );
  }
  componentWillUnmount() {
    // Clear the interval before unmounting the component
    clearInterval(this.intervalID);
  }
  Msubmit = async () => {
    let { status, description, stepdata } = this.state;
    // console.log(status, "h", description);
    if (status === "failed" && description === "") {
      toast.error("plzz enter description if failed");
    } else {
      console.log("hii", stepdata._id);
      let id = stepdata._id;
      // var newStateArray = this.state.testcasedata
      // newStateArray.push('new value');
      // this.setState(myArray: newStateArray);
      let ttime = this.state.currentTime.toLocaleTimeString();
      // await this.setState({ currentTime: ttime });
      let result = {
        status: status,
        description: description,
        stopTime: ttime,
      };
      console.log(result);
      const updatedStepArr = this.state.testcasedata.stepArr.map((step) => {
        if (step._id === id) {
          // If the ID of the current object matches the ID we're looking for,
          // update the object with the new data
          console.log(step);
          return {
            ...step,
            // Add or update the property you want to update here
            result: result,
          };
        } else {
          // If the ID of the current object doesn't match the ID we're looking for,
          // return the current object unchanged
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
      }

      // Update the component state with the new array

      console.log(this.state.testcasedata.stepArr);
    }
  };
  passData = async (data) => {
    console.log(data);
    await this.setState({ pauseTime: data });
    if (this.state.testcasedata.counttesterTime) {
      await this.state.testcasedata.counttesterTime.push(data);
      console.log(this.state.testcasedata.counttesterTime);
    }
  };
  indexTestcase = async (tdata) => {
    // console.log(tdata);
    let name = tdata.testname;
    const smile = document.getElementById("smile").innerHTML;
    if (name === smile) return toast.error("please select another testcase");
    // if (name !== smile) return toast.error("please save the existing testcase");
    let ttime = this.state.currentTime.toLocaleTimeString();

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
  SubmitTest = async (e) => {
    e.preventDefault();
    let { testcasedata } = this.state;
    console.log(testcasedata);
    // axios.post("", { data: { testcasedata: testcasedata } });
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
              <div>{this.state.data.testsetname}</div>
              <div>{this.state.currentDate.toLocaleDateString()}</div>
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
                <div>
                  {this.state.data.testcases.map((val, index) => (
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => this.indexTestcase(val)}
                      key={index}
                    >
                      {val.testname}
                    </button>
                  ))}
                </div>
                <Timer passData={this.passData} />
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
