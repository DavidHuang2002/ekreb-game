import fs from 'fs';

export function readWordsFromCSV(filePath, numWords = 100) {
  const data = fs.readFileSync(filePath, 'utf-8').replace(/\r/g, '');
  const allWords = data.split('\n');
  const selectedWords = [];
  
  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * allWords.length);
    selectedWords.push(allWords[randomIndex]);
  }
  
  return selectedWords;
}
