import { Router } from 'express';
import { getScrambledWord, checkGuess } from './controllers/wordController.js';
import { startSession, endSession } from './controllers/sessionController.js';

const router = Router();

router.get('/start', startSession);
router.get('/end/:sessionId', endSession);
router.get('/word/:sessionId', getScrambledWord);
router.get('/guess/:sessionId/:guess', checkGuess);


export default router;
