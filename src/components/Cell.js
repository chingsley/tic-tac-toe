import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: '',
    };
  }
  
  play = () => {
    // console.log(this.state);
    this.setState({ marker: this.props.manPlayTurn ? 'x' : 'o' });
    
    setTimeout(() => {this.props.togglePlayTurn()}, 1000);
  };
  
  render() {
    console.log(this.props.botCellChoice);
    return (
      <div
        className={`cell ${this.state.marker}`}
        id={this.props.cellNumber}
        onClick={this.play}
      >
        {this.state.marker}
      </div>
    );
  }
};

export default Cell;
