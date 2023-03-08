import React from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPaused: false,
      currentDate: "",
      setModal: false,
    };
    console.log();
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.setState({ currentDate: moment().format("LTS") }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handlePauseClick = (e) => {
    e.preventDefault();
    let ttime = this.state.currentDate;
    if (this.state.isPaused === true) {
      const data = {
        time: ttime,
        type: "isResumed",
      };
      this.props.passData(data);
      this.setState({ setModal: false });
      this.setState((prevState) => ({
        isPaused: !prevState.isPaused,
      }));
      return;
    }

    const data = {
      time: ttime,
      type: "isPaused",
    };
    this.props.passData(data);
    this.setState({ setModal: true });
    this.setState((prevState) => ({
      isPaused: !prevState.isPaused,
    }));

    // console.log(this.state.isPaused);
  };

  render() {
    let { isPaused } = this.state;

    return (
      <div>
        {/* <div>
          <span>{hours < 10 ? `0${hours}` : hours}</span>:
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div> */}
        {/* <i className="mdi mdi-pause-circle-outline"></i> */}

        {this.props.button ? (
          <i
            className={` ${
              isPaused ? "mdi mdi-play" : "mdi mdi-pause-circle-outline"
            }`}
            style={{
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={this.handlePauseClick}
          >
            {/* {isPaused ? "Resume" : "Pause"} */}
          </i>
        ) : null}

        {/* <button onClick={this.handleStopClick}>Stop</button> */}

        <Modal
          show={this.state.setModal}
          // onHide={() => this.setState({ setModal: false })}
        >
          <button onClick={this.handlePauseClick}>
            {isPaused ? "Resume" : "Pause"}
          </button>
          {/* <Modal.Header closeButton>
            <Modal.Title>Test Page</Modal.Title>
          </Modal.Header>

          <Modal.Body> </Modal.Body>
          <Modal.Footer>
            <button onClick={() => this.setState({ setModal: false })}>
              Close
            </button>
          </Modal.Footer> */}
        </Modal>
      </div>
    );
  }
}

export default Timer;
