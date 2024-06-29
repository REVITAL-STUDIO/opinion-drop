import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');

dotenv.config({ path: envPath });

const app = express();

//allows all clients to make requests
app.use(cors());

app.use(express.json());

app.use('/api', router);



// Starting node server
const PORT = process.env.APP_SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});