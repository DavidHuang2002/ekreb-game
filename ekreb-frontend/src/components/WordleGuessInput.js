import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import { connect } from 'dva';

const GuessInput = ({ dispatch, guessValues, scrambledWordLength }) => {
  const [inputRefs, setInputRefs] = useState([]);

  useEffect(() => {
    setInputRefs((inputRefs) => Array(scrambledWordLength).fill().map((_, i) => inputRefs[i] || React.createRef()));
  }, [scrambledWordLength]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    guessValues[index] = value;

    if (index < scrambledWordLength - 1 && value !== "") {
      inputRefs[index + 1].current.focus();
    }

    dispatch({
      type: 'game/updateGuessValues',
      payload: [...guessValues],
    });
  };

  const handleSubmit = () => {
    const guess = guessValues.join("");
    dispatch({
      type: 'game/submitGuess',
      guess,
    });
  }

  return (
    <div>
      <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: '15px'
      }}>
        {inputRefs.map((ref, i) => (
          <Input
            ref={ref}
            key={i}
            maxLength={1}
            style={{ width: '60px', height: '60px', textAlign: 'center', fontSize: '2em' }}
            value={guessValues[i]}
            onChange={(e) => handleInputChange(e, i)}
          />
        ))}
      </div>
      <Button 
        type='primary'
        style={{marginTop: "30px"}}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  scrambledWordLength: state.game.scrambledWord.length,
  guessValues: state.game.guessValues,
});

export default connect(mapStateToProps)(GuessInput);
