import { getRandomWord, scrambleWord, updateHint } from '../services/wordService.js';
import { getSession } from './sessionController.js';

export const getScrambledWord = async (req, res) => {
  const { sessionId } = req.params;
  const session = getSession(sessionId);
  if (!session) {
    res.status(404).send('Session not found.');
    return;
  }

  const word = await getRandomWord(sessionId);
  session.currentWord = word;
  // resetting the hint
  session.hint = "";
  // incrementing round - assuming we only call this method when we are ready to start a new round
  // in other words, no skipping words within one round
  session.round += 1;

  const scrambledWord = scrambleWord(word);
  session.scrambledWord = scrambledWord;
  res.json({ scrambledWord, round: session.round });
};

export const checkGuess = (req, res) => {
  const { sessionId, guess } = req.params;
  const session = getSession(sessionId);
  if (!session) {
    res.status(404).send('Session not found.');
    return;
  }

  session.attempts += 1;
  if (guess === session.currentWord) {
    session.score += 1;
    res.json({ correct: true, score: session.score, attempts: session.attempts });
  } else {
    res.json({ correct: false, score: session.score, attempts: session.attempts });
  }
};

export const getHint = (req, res) => {
  const { sessionId } = req.params;
  const session = getSession(sessionId);
  if (!session) {
    res.status(404).send('Session not found.');
    return;
  }

  session.hint = updateHint(session.hint, session.currentWord);
  res.json({ hint: session.hint });
}