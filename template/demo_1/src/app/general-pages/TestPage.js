import React, { Component } from "react";
import { Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Pagination from "../pagination/Pagination";
export class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testname: "",
      steps: "",
      testinfo: "",
      status: "",
      testlevel: "",
      assigntoproject: "",
      stepArr: [],
      AlltestsetData: [],
      testsetid: "",
      isExpired: false,
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 0,
      pageCount: 0,
    };
  }
  componentDidMount() {
    this.getStep();
    this.GetAlltestSet();
  }
  deletestep = (id) => {
    //console.log(id);
    this.setState((prevState) => ({
      stepArr: prevState.stepArr.filter((test) => test._id !== id),
    }));
    try {
      axios.delete("http://localhost:5000/api/step/deletestep", {
        data: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  };
  GetAlltestSet = () => {
    axios.get("http://localhost:5000/api/testset/gettestsets").then((res) => {
      // console.log(res.data);
      this.setState({ AlltestsetData: res.data.Result });
    });
  };
  AddtoTestset = async (data) => {
    // console.log(this.state.testsetdata._id);
    console.log(data);
    let testsetid = this.state.testsetid;
    // console.log(data._id);
    if (this.state.testsetid === "") {
      alert("testset not declared");
    } else {
      try {
        let Result = await axios.post(
          "http://localhost:5000/api/testset/inserttestsbyid",
          [{ id: testsetid }, { testcaseinfo: data }]
        );
        console.log(Result);
        // console.log(data.testname);
        toast.success(
          `Test case "${data.testname}" added to TestSet successfully`
        );
        this.GetAlltestSet();
      } catch (error) {
        console.log(error);
      }
    }
  };
  refreshPage() {
    window.location.reload(false);
  }
  getStep = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    const itemsPerPage = this.state.itemsPerPage;
    axios
      .get("http://localhost:5000/api/step/getstep", {
        headers: {
          "x-auth-token": token,
        },
        params: {
          page: this.state.currentPage,
          limit: itemsPerPage,
        },
      })
      .then((res) => {
        //console.log(resulto.data);
        let data = res.data.Stepres;
        this.setState({ stepArr: data });
        this.setState({ data });
        this.setState({ totalItems: res.data.counter });
        this.setState({
          pageCount: Math.ceil(this.state.totalItems / this.state.itemsPerPage),
        });
      })
      .then(() => this.empty())
      .catch((error) => {
        if (error.response.data.msg)
          return toast.error(error.response.data.msg);

        toast.error(error.response.data.error);
        this.setState({ isExpired: true });
      });
  };
  handlePageChange = (data) => {
    //here any param by default returns object with selected as key and page no. as value
    this.setState({ currentPage: data.selected + 1 }, this.getStep);
    // console.log(this.fetchData)
  };
  empty = () => {
    document.getElementById("stepname").value = "";
    document.getElementById("status").value = "";
    document.getElementById("level").value = "";
    document.getElementById("test").value = "";
    document.getElementById("assigntoproject").value = "";
    document.getElementById("info").value = "";
    // document.getElementById("").value = "";
    // console.log(document.getElementById("stepname").value);
  };
  handlestep = async (e) => {
    e.preventDefault();
    if (this.state.steps.length <= 3) {
      toast.error("enter word greater than 3");
    } else {
      let val = { steps: this.state.steps };
      try {
        let result = await axios.post("http://localhost:5000/api/step", val);
        console.log("postresult", result.data);
        if (result.data.err) {
          console.log(result.data.err);
        } else {
          this.getStep();
        }
      } catch (error) {
        console.log("check Error");
      }
    }
  };
  settestset = async () => {
    let id = this.state.testsetid;

    this.setState({ testsetid: "" });
    console.log(id);
  };
  handlechange = async (e) => {
    e.preventDefault();
    //console.log(e.target.name);
    if (e.target.name === "assigntoproject") {
      const selectedIndex = e.target.selectedIndex;
      console.log(selectedIndex);
      if (selectedIndex === 0) {
        console.log("Please Select", selectedIndex);
      } else {
        const selectedId = this.state.AlltestsetData[selectedIndex - 1]._id;
        this.setState({ testsetid: selectedId });
      }
    }

    //

    // this.setState({selectedTestId: selectedId});
    const { name, value } = e.target;
    // console.log("name", name, "value", value);
    this.setState({
      [name]: value,
    });
  };
  Posttestset = async (obj) => {
    let token = JSON.parse(localStorage.getItem("token"));
    // console.log("token", token);
    if (token === null) {
      this.setState({ isExpired: true });
    }
    try {
      let result = await axios.post("http://localhost:5000/api/testcase", obj, {
        headers: {
          "x-auth-token": token,
        },
      });

      console.log("result", result);
      this.setState({
        testname: "",
        testinfo: "",
        steps: "",
        status: "",
        testlevel: "",
        assigntoproject: "",
      });
      // this.settestset();
      if (result.status === 200) {
        toast.success("Test Case Uploaded Successfully");
        // this.empty();
      }
      let text = result.data.err || "";
      if (text.includes("duplicate"))
        return toast.error("Testname with this name already exists");

      if (result.data.err) {
        console.log(result);
        toast.error(result.data.err);
      }

      // console.log("result", result.data);
    } catch (error) {
      console.log(error);
      toast.error("Duplicate key for Test name");
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.state.steps === []) return alert("please Fill Values");

    let { testname, testinfo, testlevel, status, stepArr, assigntoproject } =
      this.state;
    let obj = {
      testname: testname,
      testinfo: testinfo,
      testlevel: testlevel,
      status: status,
      assigntoproject: assigntoproject,
      stepArr: stepArr,
    };
    // console.log(obj);

    // console.log("submit->", values);
    if (obj.testname === "") return toast.error("testname is required");
    if (obj.status === "") return toast.error("status is required");
    if (obj.testlevel === "") return toast.error("testlevel is required");
    if (obj.testinfo === "") return toast.error("testinfo is required");

    if (!this.state.testsetid) {
      this.Posttestset(obj);
    } else {
      this.AddtoTestset(obj);
      this.Posttestset(obj);
    }
  };
  render() {
    return (
      <div>
        <Toaster />
        {this.state.isExpired === true && <Redirect to="/login" />}
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
                      <label htmlFor="Add Steps">Steps Name</label>
                      <Form.Control
                        type="text"
                        id="stepname"
                        placeholder="mention stepname"
                        size="lg"
                        name="steps"
                        value={this.state.steps}
                        onChange={this.handlechange}
                        autoComplete="off"
                        required
                      />
                    </Form.Group>
                    <button
                      type="submit"
                      className="btn btn-gradient-primary mr-2"
                      onClick={this.handlestep}
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
                          <th>Id</th>
                          <th> Delete </th>
                          <th> Step name </th>
                        </tr>
                      </thead>
                      {this.state.stepArr.map((val, index) => (
                        <tbody key={val._id}>
                          {console.log(index)}
                          <tr>
                            <td>
                              {/* {(index + 1)((this.state.currentPage - 1) * 5)} */}
                            </td>
                            <td>
                              {" "}
                              <i
                                style={{ cursor: "pointer" }}
                                className="mdi mdi-delete"
                                onClick={() => this.deletestep(val._id)}
                              ></i>
                            </td>
                            <td key={val._id}> {val.steps} </td>
                          </tr>
                        </tbody>
                      ))}
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
                        Test Name
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          id="test"
                          type="text"
                          name="testname"
                          autoComplete="off"
                          value={this.state.testname}
                          onChange={this.handlechange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Test Info
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          id="info"
                          type="text"
                          autoComplete="off"
                          name="testinfo"
                          value={this.state.testinfo}
                          onChange={this.handlechange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Status</label>
                      <div className="col-sm-9">
                        <select
                          id="status"
                          className="form-control"
                          name="status"
                          value={this.state.status}
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
                      <label className="col-sm-3 col-form-label">Level</label>
                      <div className="col-sm-9">
                        <select
                          id="level"
                          className="form-control"
                          onChange={this.handlechange}
                          value={this.state.testlevel}
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
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Assign To TestSet
                      </label>
                      {/* {console.log(this.state.AlltestsetData)} */}
                      <div className="col-sm-9">
                        <select
                          className="form-control"
                          onChange={this.handlechange}
                          value={this.state.assigntoproject}
                          name="assigntoproject"
                          id="assigntoproject"
                        >
                          <option value="">select</option>
                          {this.state.AlltestsetData.map((val) => (
                            <option key={val._id} value={val.testsetname}>
                              {val.testsetname}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Form.Group>
                    <button
                      type="submit"
                      className="btn btn-gradient-primary mr-2"
                      name="assigntoproject"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Pagination
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
          pageCount={this.state.pageCount}
        />
      </div>
    );
  }
}

export default TestPage;
