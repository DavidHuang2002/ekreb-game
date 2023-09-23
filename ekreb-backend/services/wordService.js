import axios from 'axios';
import { readWordsFromCSV } from '../utils/csvReader.js';
import { apiConfig } from '../config/apiConfig.js';

// keep track of a list words for each session to pick from
// TODO: no need for each session. Just one list of words for the whole app
let sessionWordsList = {};

const nextWord = (words) => {
  return words.shift();
}

export async function getRandomWord(sessionId) {
  if (sessionWordsList[sessionId] == null
    || sessionWordsList[sessionId].length === 0) {
    await populateWords(sessionId, 100);
  }
  return nextWord(sessionWordsList[sessionId]);
}

export const scrambleWord = (word) => {
  return word.split('').sort(() => Math.random() - 0.5).join('');
};

async function populateWords(sessionId, numWords) {
    try {
      // TODO add a time out 
      console.log('Reading from API for session: ', sessionId);
      sessionWordsList[sessionId] = await readFromAPI(numWords);
    } catch (error) {
      // TODO - test the csv reader
      console.log('Failed to read from API, reading from CSV instead.');
      sessionWordsList[sessionId] = readWordsFromCSV('./data/english-words.csv', numWords);
    }
  }  

async function readFromAPI(numWords = 100) {
    const url = `${apiConfig.randomWordAPI}/word?number=${numWords}`;
    const response = await axios.get(url);
    return response.data;
}