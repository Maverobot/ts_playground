import * as React from 'react';
import PlotlyChart from 'react-plotlyjs-ts';

interface Props {
  width: number;
  height: number;
}

class Plotter extends React.Component<Props> {
  handleClick = (evt: any) => console.log('click');
  handleHover = (evt: any) => console.log('hover');

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
    const layout = {
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
      height: this.props.height,
      xaxis: {
        title: 'time',
      },
    };
    return (
      <PlotlyChart
        data={data}
        layout={layout}
        onClick={this.handleClick}
        onHover={this.handleHover}
      />
    );
  }
}

export default Plotter;
