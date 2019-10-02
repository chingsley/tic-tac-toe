import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: '',
      available: true,
    };
  }
  
  play = () => {
    if(!this.state.available) {
      return;
    }
    this.setState({
      marker: 'x',
      available: false,
    });
    this.props.togglePlayTurn();
    this.props.updateAvailableCells(this.props.cellNumber);
  
    setTimeout(() => {this.props.makeBotPlay()}, 500);
  };


  componentDidMount() {
    if (this.props.botPlayTurn && this.props.cellNumber === this.props.botCellChoice) {
      this.setState({available: false});
    }
  }

  componentDidUpdate() {
    if (this.props.botPlayTurn && this.props.cellNumber === this.props.botCellChoice) {
      this.setState({ available: false });
    }
  }

  shouldComponentUpdate() {
    if(this.state.available) {
      return true;
    } else {
      return false;
    }
  }
  
  render() {
    const m = this.state.marker;
    return (
      <div
        className={`cell ${(this.props.botPlayTurn && this.props.cellNumber === this.props.botCellChoice) ? 'o' : m}`}
        id={this.props.cellNumber}
        onClick={this.play}
      >
        {(this.props.botPlayTurn && this.props.cellNumber === this.props.botCellChoice) ? 'o' : m }
      </div>
    );
  }
};

export default Cell;
