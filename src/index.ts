import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import todo from './routes/todo';

const app: Express = express();
const PORT: Number = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', todo);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
