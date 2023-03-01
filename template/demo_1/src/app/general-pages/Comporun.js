import React, { Component } from "react";
import { Form } from "react-bootstrap";

import Timer from "./timer/Timer";
export default class Comporun extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data, testcasedata: {} };
    this.setState = this.setState.bind(this);
  }
  componentDidMount() {
    // console.log(this.props.data);
    // const { seconds, minutes, hours } = useTimer({
    //   expiryTimestamp: Date.now() + 60000,
    // });
  }

  indexTestcase = async (tdata) => {
    console.log(tdata);
    await this.setState({ testcasedata: tdata });
  };
  render() {
    return (
      <div>
        {/* <Timer /> */}
        <div className="col-12 grid-margin stretch-card">
          {" "}
          <div className="card">
            <div
              className="card-body"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>{this.state.data.testsetname}</div>
              <Timer />
            </div>
          </div>
        </div>
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <form className="forms-sample"></form>
              {this.state.data.testcases.map((val, index) => (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => this.indexTestcase(val)}
                  key={index}
                >
                  {index}
                </button>
              ))}
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
                      <blockquote className="blockquote">
                        {this.state.testcasedata.testname}
                      </blockquote>
                    </div>
                  </Form.Group>

                  <button
                    type="submit"
                    className="btn btn-gradient-primary mr-2"
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
                    {this.state.testcasedata.stepArr
                      ? this.state.testcasedata.stepArr.map((val) => (
                          <tbody>
                            <tr>
                              <td>
                                <center>{val.steps}</center>
                              </td>
                            </tr>
                          </tbody>
                        ))
                      : null}
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
