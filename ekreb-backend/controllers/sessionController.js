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

export const getSession = (sessionId) => {
  return activeSessions[sessionId];
};

const createSession = (sessionId) => {
  activeSessions[sessionId] = {
    currentWord: '',
    score: 0,
    attempts: 0,
  };
};

