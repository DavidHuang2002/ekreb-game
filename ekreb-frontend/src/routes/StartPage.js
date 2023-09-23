import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { startSession } from '../services/api';
import style from './StartPage.css';
import TextScramble from '../components/startPageDisplay/TextScramble/index';

const StartPage = ({dispatch, history}) => {

  const handleClick = async () => {
    try {
      const { sessionId } = await startSession();
      history.push(`/session/${sessionId}`);
    } catch (error) {
      console.error('Couldn\'t start the session', error);
    }
  };

  return (
    <div className="start-page">
      <div className={style.gameTitle}>
        <div className={style.typingEffect}>
          <h1>ekreb</h1>
        </div>
        <TextScramble phrases={["A Word Unscrambling Game"]}/>
        <Button size="large" onClick={handleClick}>Start Game</Button>
      </div>
    </div>
  );
};

export default connect()(StartPage);