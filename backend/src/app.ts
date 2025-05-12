import { connectToDB } from 'config/db';
import cookieParser from 'cookie-parser';
import express from 'express';
import errorHandler from 'middleware/error';
import router from './api/v1/routes';
import cors from 'cors';
const app = express();
connectToDB();

const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});
app.use('/api/v1', router);

app.use(errorHandler);

app.listen(PORT ?? 5500, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
