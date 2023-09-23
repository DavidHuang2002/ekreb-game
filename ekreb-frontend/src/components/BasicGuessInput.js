import { Input } from "antd";
import { connect } from "dva";

/**
 * @deprecated
 * A component for inputting guesses. It has the same functionality as WordleGuessInput
 * I developed it since I did not know how long the wordle input will take me to develop
 * keeping it here just in case for future use
 * To use it, simply change the default value of guessValues in game.js from [] to ""
 */

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
