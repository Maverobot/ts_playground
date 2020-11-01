import React, { Component } from 'react';
import Counter, { CounterProps } from './counter';

interface Props {}

interface State {
  counters: Array<CounterProps>;
}

export default class Counters extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      counters: [
        { id: 1, value: 4 },
        { id: 2, value: 3 },
        { id: 3, value: 2 },
        { id: 4, value: 1 },
      ],
    };
  }

  handleDelete = (id: number) => {
    const counters = this.state.counters.filter(
      (c: CounterProps) => c.id !== id
    );

    this.setState({ counters });
  };

  handleReset = () => {
    console.log('reset handler');
    const counters = this.state.counters.map((c: CounterProps) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleIncrement = (counter: CounterProps) => {
    // Copy the array but the content pointing to same objects as this.state.counters
    const counters = [...this.state.counters];
    const index = this.state.counters.indexOf(counter);

    // ... is called spread operator
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  render() {
    // Never forget to set "key" to have an unique value, otherwise react cannot find and update hte correct component.
    return (
      <div>
        <button
          onClick={this.handleReset}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        {this.state.counters.map((counter_props: CounterProps) => (
          <Counter
            key={counter_props.id}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            counter={counter_props}
          ></Counter>
        ))}
      </div>
    );
  }
}
