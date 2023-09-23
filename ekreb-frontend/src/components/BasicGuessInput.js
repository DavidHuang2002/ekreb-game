import { Input } from "antd";
import { connect } from "dva";

const GuessInput = ({ dispatch, scrambledWordLength, guessValues}) => {
  const handleGuess = (guess) => {
    dispatch({
      type: 'game/submitGuess',
      guess,
    });
  };

  return (<Input
    maxLength={scrambledWordLength}
    style={{ height: '60px', textAlign: 'center', fontSize: '2em' }}
    onPressEnter={(e) => handleGuess(e.target.value)}
  />);
}


const mapStateToProps = (state) => ({
  scrambledWordLength: state.game.scrambledWord.length,
  guessValues: state.game.guessValues,
});

export default connect(mapStateToProps)(GuessInput);
