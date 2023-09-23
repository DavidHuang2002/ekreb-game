import express from 'express';
import cors from 'cors';
import router from './routes.js';


const app = express();
const port = 3001;

app.use(cors());

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
