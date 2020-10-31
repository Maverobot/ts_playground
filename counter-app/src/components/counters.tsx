import React, { Component } from 'react';
import Counter, { Props as CounterProps } from './counter';

interface Props {}

interface State {
  counters: Array<CounterProps>;
}

export default class Counters extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      counters: [
        { id: 1, value: 4, selected: false },
        { id: 2, value: 0, selected: false },
        { id: 3, value: 0, selected: false },
        { id: 4, value: 0, selected: false },
      ],
    };
  }
  render() {
    return (
      <React.Fragment>
        {this.state.counters.map((counter_data: CounterProps) => (
          <Counter id={counter_data.id} value={counter_data.value} selected>
            <h4> Counter #{counter_data.id} </h4>
          </Counter>
        ))}
      </React.Fragment>
    );
  }
}
