import React, { Component } from 'react';
import CSS from 'csstype';

export interface Props {
  id: number;
  value: number;
  selected: boolean;
}

interface State {
  value: number;
  tags: string[];
}

class Counter extends Component<Props, State> {
  styles: CSS.Properties = {
    fontSize: '20px',
    color: 'blue',
    fontWeight: 'bold',
  };

  constructor(props: Props) {
    super(props);
    this.state = { value: this.props.value, tags: ['tag1', 'tag2', 'tag3'] };
  }

  handleIncrement = () => {
    this.setState({ value: this.state.value + 1, tags: this.state.tags });
  };

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        {this.props.children}
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
    classes = classes.concat(this.state.value === 0 ? 'warning' : 'primary');
    return classes;
  }

  formatCount() {
    const { value } = this.state;
    return value === 0 ? 'Zero' : value;
  }
}

export default Counter;
