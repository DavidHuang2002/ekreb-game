const axios = require('axios');
const baseURL = 'http://localhost:3001';

async function testAPI() {
  try {
    // Start Session
    const { data: startData } = await axios.get(`${baseURL}/start`);
    console.log("Start Session:", startData);

    const sessionId = startData.sessionId;

    // Fetch Scrambled Word
    const { data: wordData } = await axios.get(`${baseURL}/word/${sessionId}`);
    console.log("Scrambled Word:", wordData);

    // Make a Guess
    const { data: guessData } = await axios.get(`${baseURL}/guess/${sessionId}/${wordData.scrambledWord}`);
    console.log("Check Guess:", guessData);

    // End Session
    const { data: endData } = await axios.get(`${baseURL}/end/${sessionId}`);
    console.log("End Session:", endData); 
  } catch (error) {
    console.error("API Error:", error);
  }
}

testAPI();
