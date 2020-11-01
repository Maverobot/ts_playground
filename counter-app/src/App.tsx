import React, { Component } from 'react';
import NavBar from './components/navbar';
import Counters from './components/counters';
import { CounterProps } from './components/counter';
import './App.css';

interface Props {}

interface State {
  counters: Array<CounterProps>;
}

class App extends Component<Props, State> {
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

  render() {
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }

  handleDelete = (id: number) => {
    const counters = this.state.counters.filter(
      (c: CounterProps) => c.id !== id
    );
    this.setState({ counters });
  };

  handleReset = () => {
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
}

export default App;
