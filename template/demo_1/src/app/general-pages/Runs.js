import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
export default class Runs extends Component {
  constructor(props) {
    super(props);
    this.state = { AlltestsetData: [], setModal: false, query: "" };
    this.setState = this.setState.bind(this);
  }
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
  HandleChange = (e) => {
    e.preventDefault();
    this.setState({ query: e.target.value });
  };
  render() {
    return (
      <div>
        {" "}
        <Toaster />
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
                marginLeft: "1180px",
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
                    <tbody onClick={() => console.log("Hii")}>
                      <tr>
                        <td>Jacob</td>
                      </tr>
                      <tr>
                        <td>Jacob</td>
                      </tr>
                    </tbody>
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
                              //   onClick={}
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
