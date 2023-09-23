import {checkGuess, endSession, getScrambledWord} from "../services/api";
import {message} from "antd";

const initialGameStats = {
  round: 0,
  attempts: 0,
  score: 0,
}

export default {
  namespace: 'game',
  state: {
    sessionId: '',
    round: 0,
    attempts: 0,
    score: 0,
    scrambledWord: '',
    guessValues: "",

    gameStatsModleVisible: false,
  },
  effects: {
    // assuming valid sessionId
    *startGame({ sessionId }, { call, put, select}) {
      yield put({
        type: 'updateSessionId',
        payload: sessionId,
      });
      yield put({
        type: 'updateState',
        payload: {
          ...initialGameStats,
        },
      });
      
      yield put({
        type: 'startRound',
      })
    },

    *endGame(_, { call, put, select }) {
      const {sessionId} = yield select(state => state.game);
      const res = yield call(endSession, sessionId);
      // TODO: handle error for request
      yield put({
        type: 'updateState',
        payload: {
          gameStatsModalVisible: true,
        },
      });
    },

    *startRound(_, { call, put, select }) {
      const {sessionId, round} = yield select(state => state.game);
      const res = yield call(getScrambledWord, sessionId);
      yield put({
        type: 'updateState',
        payload: {
          scrambledWord: res.scrambledWord,
          round: round + 1,
        },
      });
    },

    *submitGuess({ guess }, { call, put, select}) {
      const sessionId = yield select(state => state.game.sessionId);

      const res = yield call(checkGuess, {sessionId, guess});
      if (res.correct) {
        message.success('Correct!');
        yield put({
          type: 'updateState',
          payload: {
            score: res.score,            
            attempts: res.attempts,
          },
        });
        yield put({
          type: 'startRound',
        });
      } else {
        message.error('Incorrect!');
        yield put({
          type: 'updateState',
          payload: {
            attempts: res.attempts,
          },
        });
      }
    }
  },
  reducers: {
    initializeGuessValues(state, { wordLength }) {
      return {
        ...state,
        guessValues: Array(wordLength).fill(""),
      };
    },

    setGameStatsModalVisible(state, { payload }) {
      return {
        ...state,
        gameStatsModalVisible: payload,
      };
    },

    updateSessionId(state, {payload}) {
      return {
        ...state,
        sessionId: payload,
      }
    },

    updateGuessValues(state, { payload }) {
      return {
        ...state,
        guessValues: payload,
      };
    },

    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  
};