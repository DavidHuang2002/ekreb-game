// src/pages/GamePage.js
import React, { useEffect } from 'react';
import { connect } from 'dva';
import {Layout, Space, Button, Spin, Modal, Row, Col, Card } from 'antd';
import BasicGuessInput from '../../components/BasicGuessInput';
import WordleGuessInput from '../../components/WordleGuessInput';
import GameStatsModal from '../../components/gameDisplay/GameStatsModal';
import HintToggle from '../../components/gameDisplay/HintToggle';

// import GuessInput from '../../components/BasicGuessInput.js';
const { Header, Content, Footer } = Layout;


const GamePage = ({ game, loading, match, history, dispatch,}) => {
  const sessionId = match.params.sessionId;

  useEffect(() => {
    console.log("Your session ID is:", sessionId); 
    dispatch({
      type: 'game/startGame',
      sessionId,
    });
  }, [sessionId]);


  const handleEndGame = () => {
    Modal.confirm({
      title: 'Are you sure you want to end the game?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        dispatch({
          type: 'game/endGame',
        });
      },
    });
    // Call API and update state
  };

  return (
    <Layout style={{height: "100vh"}}>
      <Header>
        <Row >
          <Col span={6}>
            <Button type="danger" onClick={handleEndGame}>End Game</Button>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'white' }}>ekreb</h1>
          </Col>
          <Col span={6}>
          <div style={{ textAlign: 'right', color: 'white' }}>
            <span style={{ margin: '0 10px' }}>Round: {game.round}</span>
            <span style={{ margin: '0 10px' }}>Attempts: {game.attempts}</span>
            <span style={{ margin: '0 10px' }}>Score: {game.score}</span>
          </div>
          </Col>
        </Row>
      </Header>

      <Spin  
        tip={"Flipping through dictionary for a hard word..."}
        spinning={loading}
      >
        <Content style={{ padding: '50px', textAlign: 'center', display: "flex", flexDirection: "column", alignItems: "center"}}>
              <Card title="Your Puzzle"
                style={ {
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                  width: '100%',
                  maxWidth: '800px',
                  marginBottom: '30px',
                }}>
                <h2 style={{ fontSize: '2em' }}>{game.scrambledWord}</h2>
              </Card>
              <div style={{marginBottom: "20px"}}>
                <HintToggle/>
              </div>
              {/* <WordleGuessInput /> */}
              <BasicGuessInput />
        </Content>
        <GameStatsModal
          onClose = {
            () => {
              history.push('/');
            }
          } />
      </Spin>

    </Layout>
  );
};

const mapStateToProps = (state) => ({
  game: state.game,
  loading: state.loading.models.game,
});

export default connect(mapStateToProps)(GamePage);
