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

// TODO comment
export const scrambleWord = (word) => {
  return word.split('').sort(() => Math.random() - 0.5).join('');
};

export const updateHint = (currentHint, word) => {
  if (currentHint.length == 0) {
    let hint = "_".repeat(word.length);

    // first hint will always be the first letter
    return hintRevealPosition(word, hint, 0);
  }

  // select a random position to reveal
  let position = selectRandomHintPosition(currentHint);
  if (position == -1) return currentHint;

  return hintRevealPosition(word, currentHint, position);
};

const selectRandomHintPosition = (hint) => {
  // find positions of _ in the hint
  let positions = [];
  for (let i = 0; i < hint.length; i++) {
    if (hint[i] == "_") {
      positions.push(i);
    }
  }

  if (positions.length == 0) return -1;

  // select a random position
  let randIdx = Math.floor(Math.random() * positions.length);
  return positions[randIdx];
};

const hintRevealPosition = (word, hint, position) => {
  return hint.substring(0, position) + word[position] + hint.substring(position + 1);
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