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
    console.log('delete handler for id ' + id);
    const counters = this.state.counters.filter(
      (c: CounterProps) => c.id !== id
    );

    this.setState({ counters });
  };

  render() {
    // Never forget to set "key" to have an unique value, otherwise react cannot find and update hte correct component.
    return (
      <React.Fragment>
        {this.state.counters.map((counter_props: CounterProps) => (
          <Counter
            key={counter_props.id}
            onDelete={this.handleDelete}
            counter={counter_props}
          ></Counter>
        ))}
      </React.Fragment>
    );
  }
}
