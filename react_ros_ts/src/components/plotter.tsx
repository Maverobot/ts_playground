import * as React from 'react';
import PlotlyChart from 'react-plotlyjs-ts';
import * as ROSLIB from 'roslib';
import config from '../config.json';

interface Props {
  width: number;
  height: number;
  topic: { name: string; msgType: string };
}

interface State {
  data: number[];
}

class Plotter extends React.Component<Props, State> {
  private ros: ROSLIB.Ros;
  private listener: ROSLIB.Topic;
  private lastUpdateDate: Date;

  bufferSize = 100;
  throttleRate = 1000;

  constructor(props: Props) {
    super(props);

    this.lastUpdateDate = new Date();

    this.ros = new ROSLIB.Ros({
      url: config.ros_url,
    });
    this.ros.on('connection', function () {
      console.debug('Connected to websocket server.');
    });
    this.ros.on('error', function (error) {
      console.error('Error connecting to websocket server: ', error);
    });
    this.ros.on('close', function () {
      console.debug('Connection to websocket server closed.');
    });

    this.state = { data: [] };

    this.listener = new ROSLIB.Topic({
      ros: this.ros,
      name: this.props.topic.name,
      messageType: this.props.topic.msgType,
      throttle_rate: 10,
      queue_size: 100, // This value should be set high if the topic is published at a high frequency, e.g. 100Hz.
      queue_length: 100,
    });

    this.listener.subscribe((message: any) => {
      let data = [...this.state.data];
      data.push(message.data);
      if (data.length > this.bufferSize) {
        data.shift();
      }
      this.setState({ data });
    });
  }

  shouldComponentUpdate() {
    const now = new Date();
    var seconds = (now.getTime() - this.lastUpdateDate.getTime()) / 1000;
    return seconds >= 1 / this.throttleRate;
  }

  componentDidUpdate() {
    this.lastUpdateDate = new Date();
  }

  createLayout = () => {
    return {
      title: this.props.topic.name,
      autosize: true,
      width: this.props.width,
      height: this.props.height,
      xaxis: {
        title: 'time',
      },
    };
  };

  render() {
    const data = [
      {
        marker: {
          color: 'rgb(16, 32, 77)',
        },
        type: 'scatter',
        x: Array.from(Array(this.state.data.length), (_, i) => i + 1),
        y: this.state.data,
      },
    ];
    return (
      <div>
        <PlotlyChart data={data} layout={this.createLayout()} />
      </div>
    );
  }
}

export default Plotter;
