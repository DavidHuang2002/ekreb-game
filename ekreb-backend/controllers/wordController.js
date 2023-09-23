import { getRandomWord, scrambleWord, updateHint } from '../services/wordService.js';
import { getSession } from './sessionController.js';

export const getScrambledWord = async (req, res) => {
  const { sessionId } = req.params;
  const session = getSession(sessionId);
  if (!session) {
    // TODO duplicate code
    res.status(404).send('Session not found.');
    return;
  }

  const word = await getRandomWord(sessionId);
  getSession(sessionId).currentWord = word;
  const scrambledWord = scrambleWord(word);
  res.json({ scrambledWord });
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