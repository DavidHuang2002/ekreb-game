import { message } from 'antd';
import http from "../../http-common";

const apiWrapper = async (apiCall, errorMsg) => {
  try {
    const { data } = await apiCall();
    return data;
  } catch (error) {
    message.error(`${errorMsg}: ${error}`);
  }
};


export const startSession = async () => {
  return await apiWrapper(() => http.get('/start'), 'Error starting session');
};

export const endSession = async (sessionId) => {
  return await apiWrapper(() => http.get(`/end/${sessionId}`), 'Error ending session');
};

export const fetchSession = async (sessionId) => {
  return await apiWrapper(() => http.get(`/fetch/${sessionId}`), 'Error fetching session');
}

export const getScrambledWord = async (sessionId) => {
  return await apiWrapper(() => http.get(`/word/${sessionId}`), 'Error fetching word');
};

export const checkGuess = async ({ sessionId, guess }) => {
  return await apiWrapper(() => http.get(`/guess/${sessionId}/${guess}`), 'Error checking guess');
};


export const getHint = async (sessionId) => {
  return await apiWrapper(() => http.get(`/hint/${sessionId}`), 'Error getting hint');
};