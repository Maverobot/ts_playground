import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import { Layout as GridLayout } from 'react-grid-layout';
import Plotter from './plotter';
import { SizeMe, SizeMeProps } from 'react-sizeme';
import ThreeViewer from './three_viewer';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface Props {}
interface State {
  elementProps: { [key: string]: ElementProps };
  size: number;
}

interface ElementProps {
  width: number;
  height: number;
}

const defaultWidth = 800;
const defaultHeight = 600;

// TODOs (priority goes from high to low)
class Layout extends React.Component<Props, State> {
  // layout is an array of objects, see the demo for more complete usage
  getLayout = (): GridLayout[] => {
    return [
      {
        i: 'plotter1',
        x: 0,
        y: 1,
        w: this.state.size,
        h: this.state.size,
        isResizable: true,
        resizeHandles: ['se'],
        static: true,
      },
      {
        i: 'three_js_viewer',
        x: 7,
        y: 1,
        w: this.state.size,
        h: this.state.size,
        isResizable: true,
        resizeHandles: ['se'],
        static: true,
      },
    ];
  };

  elements: { [key: string]: HTMLDivElement | null };

  constructor(props: Props) {
    super(props);
    this.state = { elementProps: {}, size: 7 };
    this.elements = {};
  }

  componentDidMount() {
    let changed = false;
    const elementProps = { ...this.state.elementProps };
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
    /* Check this issue: https://github.com/ctrlplusb/react-sizeme/issues/120#issuecomment-446421690 */
    return (
      <div
        key={key}
        ref={(divElement) => {
          this.elements[key] = divElement;
        }}
      >
        <SizeMe monitorHeight>
          {({ size }) => (
            <div style={{ position: 'relative', height: '100%' }}>
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: (size.height
                    ? size.height
                    : defaultHeight
                  ).toString(),
                }}
              >
                {elementFun({ size })}
              </div>
            </div>
          )}
        </SizeMe>
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
          layout={this.getLayout()}
          cols={14}
          rowHeight={60}
          width={1200}
          resizeHandles={['se']}
        >
          {this.createAutofitElement('plotter1', ({ size }) => {
            return (
              <Plotter
                {...this.getWidthAndHeight('plotter1', { size })}
                topic={{ name: '/sensor1', msgType: 'std_msgs/Float32' }}
              />
            );
          })}

          {this.createAutofitElement('three_js_viewer', ({ size }) => {
            let viewerSize = this.getWidthAndHeight('three_js_viewer', {
              size,
            });
            return <ThreeViewer {...viewerSize} />;
          })}
        </ReactGridLayout>
      </React.Fragment>
    );
  }
}

export default Layout;
