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

    // bind this to this :)
    /* this.handleIncrement = this.handleIncrement.bind(this); */
  }

  // Arrow functions do not rebind this keyword, instead they inherit it.
  handleIncrement = () => {
    // Does not have access to "this". It is undefined here.
    // In function like "obj.method()", "this" refers to "obj".
    // However in standalone function like "method()",
    // "this" in that function will refer to the reference of the window object.
    // But in strict mode, the "this" will be undefined.
    console.log('increment Clicked ', this.state.count);
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
