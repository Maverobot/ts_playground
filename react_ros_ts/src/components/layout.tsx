/* import * as React from 'react'; */
import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import { Layout as GridLayout } from 'react-grid-layout';
import Plotter from './plotter';
import { SizeMe, SizeMeProps } from 'react-sizeme';

interface Props {}
interface State {
  elementProps: { [key: string]: ElementProps };
}

interface ElementProps {
  width: number;
  height: number;
}

const defaultWidth = 800;
const defaultHeight = 600;

// TODOs (priority goes from high to low)
// TODO: resizeHandles: https://github.com/STRML/react-grid-layout/issues/1317
class Layout extends React.Component<Props, State> {
  // layout is an array of objects, see the demo for more complete usage
  layout: GridLayout[] = [
    {
      i: 'a',
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    },
    {
      i: 'c',
      x: 0,
      y: 0,
      w: 7,
      h: 10,
      isResizable: true,
      resizeHandles: ['se'],
      static: true,
    },
    {
      i: 'd',
      x: 7,
      y: 0,
      w: 7,
      h: 10,
      isResizable: true,
      resizeHandles: ['se'],
      static: true,
    },
  ];

  elements: { [key: string]: HTMLDivElement | null };

  constructor(props: Props) {
    super(props);
    this.state = { elementProps: {} };
    this.elements = {};
  }

  componentDidMount() {
    let changed = false;
    const { elementProps } = { ...this.state };
    for (let key in this.elements) {
      const ref = this.elements[key];
      if (ref) {
        const height = ref.clientHeight;
        const width = ref.clientWidth;
        elementProps[key] = { width, height };
        changed = true;
      }
    }
    if (changed) {
      this.setState({ elementProps });
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
          this.elements[key] = divElement;
        }}
      >
        <SizeMe>{({ size }) => <div>{elementFun({ size })}</div>}</SizeMe>
      </div>
    );
  }

  getWidth(key: string, sizeMeProps: SizeMeProps) {
    if (sizeMeProps.size.width) {
      return sizeMeProps.size.width;
    }
    if (this.state.elementProps && key in this.state.elementProps) {
      return this.state.elementProps[key].width;
    }
    return defaultWidth;
  }

  getHeight(key: string, sizeMeProps: SizeMeProps) {
    if (sizeMeProps.size.height) {
      return sizeMeProps.size.height;
    }
    if (this.state.elementProps && key in this.state.elementProps) {
      return this.state.elementProps[key].height;
    }
    return defaultHeight;
  }

  getWidthAndHeight(key: string, sizeMeProps: SizeMeProps) {
    return {
      width: this.getWidth(key, sizeMeProps),
      height: this.getHeight(key, sizeMeProps),
    };
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
          {this.createAutofitElement('c', ({ size }) => {
            return <Plotter {...this.getWidthAndHeight('c', { size })} />;
          })}

          {this.createAutofitElement('d', ({ size }) => {
            return <Plotter {...this.getWidthAndHeight('d', { size })} />;
          })}
          <div key="a">a</div>
          <div key="b">b</div>
        </ReactGridLayout>
      </React.Fragment>
    );
  }
}

export default Layout;
