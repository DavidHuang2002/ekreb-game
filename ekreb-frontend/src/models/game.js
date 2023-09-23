import {checkGuess, endSession, getScrambledWord, getHint, fetchSession} from "../services/api";
import {message} from "antd";

const initialGameStats = {
  round: 0,
  attempts: 0,
  score: 0,

  hint: "",
}

const isNewGame = (sessionInfo) => {
  return sessionInfo.round === 0;
}

export default {
  namespace: 'game',
  state: {
    sessionId: '',
    round: 0,
    attempts: 0,
    score: 0,
    scrambledWord: '',
    guessValues: [],

    hint: "",

    gameStatsModleVisible: false,
  },
  effects: {
    // assuming valid sessionId
    *startGame({ sessionId }, { call, put, select}) {
      yield put({
        type: 'updateSessionId',
        payload: sessionId,
      });

      const res = yield call(fetchSession, sessionId);
      yield put({
        type: 'updateState',
        payload: {
          ...res,
        },
      });
      console.log("fecth session", res, );

       // if we are in a new game, start the first round.
       // if we are in a game that has already started, we just keep playing
      if(isNewGame(res)) {
        yield put({
          type: 'startRound',
        })
      }   
    },

    *endGame(_, { call, put, select }) {
      const {sessionId} = yield select(state => state.game);
      const res = yield call(endSession, sessionId);
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
          round: res.round,
          // resetting guessed values
          guessValues: [],

          hint: "",
        },
      });
    },

    *getHint(_, { call, put, select }) {
      const {sessionId} = yield select(state => state.game);
      const res = yield call(getHint, sessionId);
      yield put({
        type: 'updateState',
        payload: {
          hint: res.hint,
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
