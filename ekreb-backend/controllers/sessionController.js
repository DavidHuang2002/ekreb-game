let activeSessions = {};



export const startSession = (req, res) => {
  // only using date tiem for sessionId for now since we only support one user at a time
  // when we have multiple users, we should use a unique id generator like hashing from userId and datetime
  const sessionId = Date.now().toString();
  createSession(sessionId);
  res.json({ sessionId });
};

export const endSession = (req, res) => {
  const { sessionId } = req.params;
  const session = activeSessions[sessionId];
  if (session) {
    const {score, attempts} = session;
    delete activeSessions[sessionId];
    res.json({ score: score, attempts: attempts });
  } else {
    res.status(404).send('Session not found.');
  }
};

export const fetchSession = (req, res, ) => {
  const { sessionId } = req.params;
  const session = activeSessions[sessionId];
  if (session) {
    res.json(sessionDataForFrontend(session));
  } else {
    res.status(404).send('Session not found.');
  }
}

export const getSession = (sessionId) => {
  return activeSessions[sessionId];
};

/**
 * truncate the data of a full session to only data that frontend
 * should see (mainly to keep the word a secret)
 * @param {*} sessionId 
 */
export const sessionDataForFrontend = (session) => {
  return {
    scrambledWord: session.scrambledWord,
    score: session.score,
    attempts: session.attempts,
    round: session.round,
    hint: session.hint
  }
};

const createSession = (sessionId) => {
  activeSessions[sessionId] = {
    currentWord: '',
    scrambledWord: '',
    score: 0,
    attempts: 0,
    round: 0,
    hint: ""
  };
};


