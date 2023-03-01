import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPaused: false,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (!this.state.isPaused) {
        const { hours, minutes, seconds } = this.state;
        if (seconds < 59) {
          this.setState({ seconds: seconds + 1 });
        } else if (minutes < 59) {
          this.setState({ minutes: minutes + 1, seconds: 0 });
        } else {
          this.setState({ hours: hours + 1, minutes: 0, seconds: 0 });
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handlePauseClick = () => {
    this.setState((prevState) => ({
      isPaused: !prevState.isPaused,
    }));
  };

  handleStopClick = () => {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPaused: true,
    });
  };
  render() {
    const { hours, minutes, seconds, isPaused } = this.state;

    return (
      <div>
        <div>
          <span>{hours < 10 ? `0${hours}` : hours}</span>:
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
        <button onClick={this.handlePauseClick}>
          {isPaused ? "Resume" : "Pause"}
        </button>
        {/* <button onClick={this.handleStopClick}>Stop</button> */}
      </div>
    );
  }
}

export default Timer;
