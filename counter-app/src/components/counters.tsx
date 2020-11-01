import React, { Component } from 'react';
import Counter, { CounterProps } from './counter';

interface Props {
  counters: Array<CounterProps>;
  onReset: () => void;
  onDelete: (id: number) => void;
  onIncrement: (c: CounterProps) => void;
}

export default class Counters extends Component<Props> {
  render() {
    // Never forget to set "key" to have an unique value, otherwise react cannot find and update hte correct component.
    return (
      <div>
        <button
          onClick={this.props.onReset}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        {this.props.counters.map((counter_props: CounterProps) => (
          <Counter
            key={counter_props.id}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            counter={counter_props}
          ></Counter>
        ))}
      </div>
    );
  }
}
