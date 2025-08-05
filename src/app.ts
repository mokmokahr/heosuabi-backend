import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRouter from './routes/index';
import ttsRouter from './routes/tts';
import userRouter from './routes/user';

dotenv.config();

const app = express();

// 기본 미들웨어
app.use(cors());
app.use(express.json());

// 라우트 연결
app.use('/', indexRouter);

app.use('/tts', ttsRouter);

app.use('/auth',userRouter);

export default app;