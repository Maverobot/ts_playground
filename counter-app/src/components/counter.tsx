import React, { Component } from 'react';
import CSS from 'csstype';

interface Props {
  counter: CounterProps;
  onDelete: (id: number) => void;
}

export interface CounterProps {
  id: number;
  value: number;
}

interface State {
  value: number;
}

// Props are the inputs to the component while states are internal local information in the component.
// Props are read-only.

class Counter extends Component<Props, State> {
  styles: CSS.Properties = {
    fontSize: '20px',
    color: 'blue',
    fontWeight: 'bold',
  };

  constructor(props: Readonly<Props>) {
    super(props);
    this.state = { value: this.props.counter.value };
  }

  handleIncrement = () => {
    this.setState({ value: this.state.value + 1 });
  };

  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}> {this.formatCount()} </span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes: string = 'badge m-2 badge-';
    classes = classes.concat(this.state.value === 0 ? 'warning' : 'primary');
    return classes;
  }

  formatCount() {
    const { value } = this.state;
    return value === 0 ? 'Zero' : value;
  }
}

export default Counter;
