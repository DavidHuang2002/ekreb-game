import { Router } from 'express';
import { getScrambledWord, checkGuess, getHint } from './controllers/wordController.js';
import { startSession, endSession, fetchSession } from './controllers/sessionController.js';

const router = Router();

router.get('/start', startSession);
router.get('/fetch/:sessionId', fetchSession);
router.get('/end/:sessionId', endSession);

router.get('/word/:sessionId', getScrambledWord);
router.get('/guess/:sessionId/:guess', checkGuess);
router.get('/hint/:sessionId', getHint);


export default router;
