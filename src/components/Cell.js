import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: '',
      available: true,
    };
  }
  
  play = async () => {
    // console.log(this.state);
    this.setState({
      marker: 'x',
      available: false,
    });
    await this.props.togglePlayTurn();
    // await this.props.makeBotPlay();
  
    setTimeout(() => {this.props.makeBotPlay()}, 2000);
    // setTimeout(() => {this.props.togglePlayTurn()}, 1000);
  };

  // shouldComponentUpdate() {
  //   if (this.props.botPlayTurn) {

  //   }
  // }

  componentDidMount() {
    if (this.props.botPlayTurn && this.props.cellNumber === this.props.botCellChoice) {
      this.setState({available: false});
    }
  }

  componentDidUpdate() {
    if (this.props.botPlayTurn && this.props.cellNumber === this.props.botCellChoice) {
      this.setState({ available: false });
      // this.props.togglePlayTurn();
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
