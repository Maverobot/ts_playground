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
    this.state = { count: 0, tags: [] };
  }

  renderTags() {
    if (this.state.tags.length === 0) {
      return <p>There are no tags</p>;
    }
    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.tags.length === 0 && 'Please create a new tag!'}
        {this.renderTags()}
      </React.Fragment>
    );
  }
}

export default Counter;
