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

export const getScrambledWord = async (sessionId) => {
  return await apiWrapper(() => http.get(`/word/${sessionId}`), 'Error fetching word');
};

export const checkGuess = async ({ sessionId, guess }) => {
  return await apiWrapper(() => http.get(`/guess/${sessionId}/${guess}`), 'Error checking guess');
};

// TODO del

// import http from "../../http-common";

// export const startSession = async () => {
//     const { data } = await http.get('/start');
//     return data;
//   };
  
//   export const endSession = async (sessionId) => {
//     const { data } = await http.get(`/end/${sessionId}`);
//     return data;
//   };
  
//   export const getScrambledWord = async (sessionId) => {
//     const { data } = await http.get(`/word/${sessionId}`);
//     return data;
//   };
  
//   export const checkGuess = async ({sessionId, guess}) => {
//     const { data } = await http.get(`/guess/${sessionId}/${guess}`);
//     return data;
//   };