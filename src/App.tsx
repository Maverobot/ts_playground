import * as React from 'react';
import PlotlyChart from 'react-plotlyjs-ts';
import ReactGridLayout from 'react-grid-layout';
import { Layout } from 'react-grid-layout';

// TODOs (priority goes from high to low)
// TODO: auto fix height and width to its content. see https://github.com/STRML/react-grid-layout/issues/190
// TODO: resizeHandles: https://github.com/STRML/react-grid-layout/issues/1317

class App extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout: Layout[] = [
      { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true, resizeHandles: ['se'] },
      {
        i: 'b',
        x: 1,
        y: 0,
        w: 3,
        h: 2,
        minW: 2,
        maxW: 4,
        resizeHandles: ['se'],
      },
      { i: 'c', x: 4, y: 0, w: 1, h: 1, resizeHandles: ['se'] },
    ];
    return (
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        resizeHandles={['se']}
      >
        <div key="a">a</div>
        <div key="b">b</div>
        <div
          key="c"
          style={{
            border: '5px outset red',
          }}
        >
          <Plotter />
        </div>
      </ReactGridLayout>
    );
  }
}

class Plotter extends React.Component {
  public handleClick = (evt: any) => console.log('click');
  public handleHover = (evt: any) => console.log('hover');

  public render() {
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

export default App;
