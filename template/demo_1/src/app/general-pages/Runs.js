import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import Comporun from "./Comporun";
export default class Runs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AlltestsetData: [],
      setModal: false,
      query: "",
      rundata: [],
      openCompo: false,
      specRun: [],
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    this.loadRuns();
  }

  loadRuns = async () => {
    let result = await axios.get("http://localhost:5000/api/testrun/getruns");
    // console.log(result);
    this.setState({ rundata: result.data });
  };

  Deleterun = async (id) => {
    console.log(id);

    this.setState((prevState) => ({
      rundata: prevState.rundata.filter((test) => test._id !== id),
    }));
    let result = await axios.delete(
      "http://localhost:5000/api/testrun/deleteruns",
      { data: { id: id } }
    );
    console.log(result);
  };
  HandleTestsetSearch = async (e) => {
    e.preventDefault();

    // submit search query to Node.js app
    if (this.state.query.length <= 3)
      return toast.error("Please enter a word greater than three letters");

    let result = await axios.get(
      "http://localhost:5000/api/testset/searchtestset?q=" + this.state.query
    );

    console.log(result);
    this.setState({ AlltestsetData: result.data });

    if (this.state.AlltestsetData.length >= 1) {
      //   console.log(this.state.AlltestsetData.length);
      this.setState({ setModal: true });
    } else {
      toast.error("No testSets Found");
    }
  };
  Addtorun = async (data) => {
    let result = await axios.post("http://localhost:5000/api/testrun", [
      { data: data },
    ]);
    this.loadRuns();
    console.log(result.data);
  };
  HandleChange = (e) => {
    e.preventDefault();
    this.setState({ query: e.target.value });
  };
  render() {
    let { rundata } = this.state;

    return (
      <div>
        {" "}
        <Toaster />
        {this.state.openCompo ? (
          <Comporun data={this.state.specRun} />
        ) : (
          <div>
            <Form.Group>
              <div className="input-group">
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="search testcase"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={this.state.query}
                  onChange={this.HandleChange}
                />
                <div className="input-group-append"></div>
                <button
                  className="btn btn-sm btn-gradient-primary"
                  type="button"
                  onClick={this.HandleTestsetSearch}
                >
                  Search
                </button>
              </div>
            </Form.Group>
            <div className="row">
              {" "}
              <Link to="home">
                <i
                  className="mdi mdi-home-variant"
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    marginLeft: "1870px",
                  }}
                ></i>
              </Link>
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Runs</h4>

                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          {/* <tr>
                        <th>User</th>
                        <th>Product</th>
                        <th>Sale</th>
                        <th>Status</th>
                      </tr> */}
                        </thead>
                        {/* {console.log(rundata)} */}

                        {rundata.map((val, index) => (
                          <tbody
                            onClick={() =>
                              this.setState({
                                openCompo: true,
                                specRun: val.testRun,
                              })
                            }
                            key={index}
                          >
                            <tr key={index}>
                              <td>
                                {val.testRun.testsetname}
                                <i
                                  id="delete"
                                  className="mdi mdi-delete-sweep"
                                  style={{
                                    marginLeft: "1600px",
                                    fontSize: "20px",
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    this.Deleterun(val._id);
                                  }}
                                ></i>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                        {/* {console.log(this.state.openCompo)} */}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.openCompo ? (
          <i
            className="mdi mdi-step-backward-2"
            onClick={() => this.setState({ openCompo: false })}
            style={{ fontSize: "30px", cursor: "pointer" }}
          ></i>
        ) : null}
        <Modal
          show={this.state.setModal}
          onHide={() => this.setState({ setModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>TestSets</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {" "}
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Hoverable Table</h4>
                <p className="card-description">
                  {" "}
                  Add className <code>.table-hover</code>
                </p>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>TestSet Name</th>
                        <th>TestCase Count</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    {this.state.AlltestsetData.map((val, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{val.testsetname}</td>
                          <td>
                            <center>{val.testcases.length}</center>
                          </td>
                          <td>
                            <i
                              className="mdi mdi-plus"
                              style={{
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => this.Addtorun(val)}
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}
