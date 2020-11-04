import * as React from 'react';
import PlotlyChart from 'react-plotlyjs-ts';

const getRandomID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

interface Props {
  width: number;
  height: number;
}

interface State {
  plotHeight: number;
}

class Plotter extends React.Component<Props, State> {
  private handleClick = (evt: any) => console.log('click');
  private handleHover = (evt: any) => console.log('hover');
  private handleInput = (evt: any) => {
    if (evt.key === 'Enter' || evt.keyCode === 13) {
      console.log('Enter pressed');
    }
  };

  private inputElement: HTMLInputElement | null;

  constructor(props: Props) {
    super(props);
    this.state = { plotHeight: props.height };
    this.inputElement = null;
  }

  createLayout = () => {
    return {
      annotations: [
        {
          text: 'simple annotation',
          x: 0,
          xref: 'paper',
          y: 0,
          yref: 'paper',
        },
      ],
      title: 'simple example',
      autosize: false,
      width: this.props.width,
      height: this.state.plotHeight,
      xaxis: {
        title: 'time',
      },
    };
  };

  componentDidMount() {
    if (this.inputElement) {
      const inputHeight = this.inputElement.getBoundingClientRect().height;
      this.setState({
        plotHeight: this.props.height - inputHeight,
      });
    }
  }

  render() {
    const data = [
      {
        marker: {
          color: 'rgb(16, 32, 77)',
        },
        type: 'scatter',
        x: [1, 2, 3],
        y: [6, 2, 3],
      },
      {
        name: 'bar chart example',
        type: 'bar',
        x: [1, 2, 3],
        y: [6, 2, 3],
      },
    ];
    return (
      <div>
        <input
          onKeyUp={this.handleInput}
          type="text"
          name="textfield"
          placeholder="Please input the topic name here"
          ref={(inputElement) => {
            this.inputElement = inputElement;
          }}
          id={getRandomID()}
        />
        <PlotlyChart
          data={data}
          layout={this.createLayout()}
          onClick={this.handleClick}
          onHover={this.handleHover}
        />
      </div>
    );
  }
}

export default Plotter;
