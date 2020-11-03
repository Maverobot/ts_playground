/* import * as React from 'react'; */
import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import { Layout as GridLayout } from 'react-grid-layout';
import Plotter from './plotter';

interface Props {}
interface State {
  plotterHeight: number;
  plotterWidth: number;
}

// TODOs (priority goes from high to low)
// TODO: auto fix height and width to its content. see https://github.com/STRML/react-grid-layout/issues/190
// TODO: resizeHandles: https://github.com/STRML/react-grid-layout/issues/1317
class Layout extends React.Component<Props, State> {
  // layout is an array of objects, see the demo for more complete usage
  layout: GridLayout[] = [
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
    {
      i: 'c',
      x: 4,
      y: 0,
      w: 6,
      h: 6,
      isDraggable: false,
      resizeHandles: ['se'],
    },
  ];

  divElement: HTMLDivElement | null = null;

  changeSize = () => {
    this.setState({ plotterHeight: 600, plotterWidth: 300 });
  };

  constructor(props: Props) {
    super(props);
    this.state = { plotterHeight: 300, plotterWidth: 600 };
  }

  componentDidMount() {
    if (this.divElement) {
      const height = this.divElement.clientHeight;
      const width = this.divElement.clientWidth;
      this.setState({ plotterWidth: width / 2, plotterHeight: height });
    }
  }

  createPlotter() {}

  render() {
    return (
      <div>
        <button onClick={this.changeSize}> Change size </button>
        <ReactGridLayout
          className="layout"
          layout={this.layout}
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
            ref={(divElement) => {
              {
                this.divElement = divElement;
              }
            }}
          >
            <Plotter
              width={this.state.plotterWidth}
              height={this.state.plotterHeight}
            />
          </div>
        </ReactGridLayout>
      </div>
    );
  }
}

export default Layout;
