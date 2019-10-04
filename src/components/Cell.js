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
    if(!this.state.available || this.props.isGameOver) {
      return;
    }
    this.setState({
      marker: 'x',
      available: false,
    });
    this.props.updateBoardState(this.props.cellNumber, 'x');
  
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
    const x = this.state.marker;
    return (
      <div
        className={`cell ${(this.props.botPlayTurn && this.props.cellNumber === this.props.botCellChoice) ? 'o' : x}`}
        id={this.props.cellNumber}
        onClick={this.play}
      >
        {(this.props.botPlayTurn && this.props.cellNumber === this.props.botCellChoice) ? 'o' : x }
      </div>
    );
  }
};

export default Cell;
