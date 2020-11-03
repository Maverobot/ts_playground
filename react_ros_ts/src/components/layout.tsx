/* import * as React from 'react'; */
import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import { Layout as GridLayout } from 'react-grid-layout';
import Plotter from './plotter';
import { SizeMe, SizeMeProps } from 'react-sizeme';

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
    {
      i: 'c',
      x: 0,
      y: 0,
      w: 8,
      h: 10,
      isResizable: true,
      resizeHandles: ['se'],
      static: true,
    },
  ];

  divElement: HTMLDivElement | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { plotterHeight: 300, plotterWidth: 600 };
  }

  componentDidMount() {
    if (this.divElement) {
      const height = this.divElement.clientHeight;
      const width = this.divElement.clientWidth;
      console.log(width);
      this.setState({ plotterWidth: width, plotterHeight: height });
    }
  }

  createAutofitElement(
    key: string,
    elementFun: (props: SizeMeProps) => JSX.Element
  ) {
    return (
      <div
        key={key}
        ref={(divElement) => {
          this.divElement = divElement;
        }}
      >
        <SizeMe>{({ size }) => <div>{elementFun({ size })}</div>}</SizeMe>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <ReactGridLayout
          className="layout"
          layout={this.layout}
          cols={14}
          rowHeight={40}
          width={1400}
          resizeHandles={['se']}
        >
          <div key="a">a</div>
          <div key="b">b</div>
          {this.createAutofitElement('c', ({ size }) => {
            return (
              <Plotter
                width={size.width || this.state.plotterWidth}
                height={size.height || this.state.plotterHeight}
              />
            );
          })}
        </ReactGridLayout>
      </React.Fragment>
    );
  }
}

export default Layout;
