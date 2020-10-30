import React, { Component } from 'react';
import CSS from 'csstype';

interface CounterProps {}

interface CounterState {
  count: number;
  tags: string[];
}

class Counter extends Component<CounterProps, CounterState> {
  styles: CSS.Properties = {
    fontSize: '20px',
    color: 'blue',
    fontWeight: 'bold',
  };

  constructor(props: CounterProps) {
    super(props);
    this.state = { count: 0, tags: ['tag1', 'tag2', 'tag3'] };
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1, tags: this.state.tags });
  };

  render() {
    return (
      <React.Fragment>
        <span className={this.getBadgeClasses()}> {this.formatCount()} </span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <ul>
          {this.state.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes: string = 'badge m-2 badge-';
    classes = classes.concat(this.state.count === 0 ? 'warning' : 'primary');
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? 'Zero' : count;
  }
}

export default Counter;
