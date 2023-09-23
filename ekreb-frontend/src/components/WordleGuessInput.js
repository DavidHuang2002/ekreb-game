import React, { useRef, useEffect } from 'react';
import { Input } from 'antd';
import { connect } from 'dva';

const GuessInput = ({ dispatch, guessValues, scrambledWordLength }) => {
  const inputRefs = Array.from({ length: scrambledWordLength }, () => useRef(null));


  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (/[^a-zA-Z]/.test(value)) {
      return;
    }

    guessValues[index] = value;

    if (index < scrambledWordLength - 1 && value !== "") {
      inputRefs[index + 1].current.focus();
    }

    dispatch({
      type: 'game/updateGuessValues',
      payload: [...guessValues],
    });
  };

  return (
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
  );
};

const mapStateToProps = (state) => ({
  scrambledWordLength: state.game.scrambledWord.length,
  guessValues: state.game.guessValues,
});

export default connect(mapStateToProps)(GuessInput);
