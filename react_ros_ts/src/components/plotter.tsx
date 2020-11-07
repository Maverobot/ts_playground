import * as React from 'react';
import PlotlyChart from 'react-plotlyjs-ts';
import * as ROSLIB from 'roslib';

// TODO: deal with high frequency topic (>100Hz)
// https://medium.com/@jmmccota/plotly-react-and-dynamic-data-d40c7292dbfb

class Throttled {
  constructor(private rate: number) {}
  private last = new Date().getTime();
  active = () => {
    const old_last = this.last;
    const now = new Date().getTime();
    const minInterval = (1 / this.rate) * 1000;
    if (now - old_last < minInterval) {
      this.last = now;
      console.log('interval: ', now - old_last);
      return true;
    }
    return false;
  };
}

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
  private throttled: Throttled;

  bufferSize = 100;
  throttleRate = 10;

  constructor(props: Props) {
    super(props);

    this.ros = new ROSLIB.Ros({
      url: 'ws://0.0.0.0:9090',
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

    this.throttled = new Throttled(this.throttleRate);

    this.listener = new ROSLIB.Topic({
      ros: this.ros,
      name: this.props.topic.name,
      messageType: this.props.topic.msgType,
      throttle_rate: 10,
      queue_size: 1,
      queue_length: 1,
    });

    this.listener.subscribe((message: any) => {
      if (this.throttled.active()) {
        return;
      }
      let data = [...this.state.data];
      data.push(message.data);
      if (data.length > this.bufferSize) {
        data.shift();
      }
      this.setState({ data });
    });
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
