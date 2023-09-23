import React from 'react';
import { Modal, Button, Statistic, Row, Col } from 'antd';
import { connect } from 'dva';

const GameStatsModal = ({ game, dispatch, onClose }) => {

  const handleClose = () => {
    dispatch({
      type: 'game/setGameStatsModalVisible',
      payload: false,
    });

    onClose();
  };

  const {score, attempts} = game;
  const accuracy = game.attempts == 0? 0 : game.score / game.attempts * 100;

  const getTitle = () => {
    if (score === 0) return "Hum, so you are a quitter";
    if (accuracy < 60) return "Do better";
    return "Wow, you're actually good at this!";
  };

  return (
    <Modal
      title={getTitle()}
      open={game.gameStatsModalVisible}
      footer={null}
      onCancel={handleClose}
    >
      <Row>
        <Col span={12}>
          <Statistic title="Attempts" value={attempts} />
        </Col>
        <Col span={12}>
          <Statistic title="Scores" value={score} />
        </Col>
      </Row>
      <Statistic title="Accuracy" value={accuracy} suffix="%" />
      <Button type="primary" onClick={handleClose} style={{ marginTop: '20px' }}>
        OK
      </Button>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(GameStatsModal);
